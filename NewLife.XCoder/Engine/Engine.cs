using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using NewLife.Reflection;
using NewLife.Threading;
using XCode.DataAccessLayer;
using XTemplate.Templating;
#if NET4
using System.Linq;
#else
using NewLife.Linq;
#endif
using XCode.DataAccessLayer.Model;
using NewLife.Model;

namespace XCoder
{
    /// <summary>������������</summary>
    public class Engine
    {
        #region ����
        public const String TemplatePath = "Template";

        private static Dictionary<String, String> _Templates;
        /// <summary>ģ��</summary>
        public static Dictionary<String, String> Templates
        {
            get
            {
                if (_Templates == null) _Templates = FileSource.GetTemplates();
                return _Templates;
            }
        }

        private static List<String> _FileTemplates;
        /// <summary>�ļ�ģ��</summary>
        public static List<String> FileTemplates
        {
            get
            {
                if (_FileTemplates == null)
                {
                    var list = new List<string>();

                    var dir = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, TemplatePath);
                    if (Directory.Exists(dir))
                    {
                        var ds = Directory.GetDirectories(dir);
                        if (ds != null && ds.Length > 0)
                        {
                            foreach (var item in ds)
                            {
                                var di = new DirectoryInfo(item);
                                list.Add(di.Name);
                            }
                        }
                    }
                    _FileTemplates = list;
                }
                return _FileTemplates;
            }
        }

        public Engine(XConfig config)
        {
            Config = config;
        }

        private XConfig _Config;
        /// <summary>����</summary>
        public XConfig Config { get { return _Config; } set { _Config = value; } }

        private String _LastTableKey;
        private List<IDataTable> _LastTables;
        private List<IDataTable> _Tables;
        /// <summary>���б�</summary>
        public List<IDataTable> Tables
        {
            get
            {
                // ��ͬ��ǰ׺����Сдѡ��õ��ı����ǲ�һ���ġ��������ֵ�������
                String key = String.Format("{0}_{1}_{2}_{3}_{4}", Config.AutoCutPrefix, Config.AutoCutTableName, Config.AutoFixWord, Config.Prefix, Config.UseID);
                //return _cache.GetItem(key, k => FixTable(_Tables));
                if (_LastTableKey != key)
                {
                    _LastTables = FixTable(_Tables);
                    _LastTableKey = key;
                }
                return _LastTables;
            }
            //set { _Tables = FixTable(value); }
            set { _Tables = value; }
        }

        private static ITranslate _Translate;
        /// <summary>����ӿ�</summary>
        static ITranslate Translate
        {
            get { return _Translate ?? (_Translate = new NnhyServiceTranslate()); }
            //set { _Translate = value; }
        }
        #endregion

        #region ����
        /// <summary>���ɴ��룬������Config����</summary>
        /// <param name="tableName"></param>
        /// <returns></returns>
        public String[] Render(String tableName)
        {
            var tables = Tables;
            if (tables == null || tables.Count < 1) return null;

            var table = tables.Find(e => e.Name.EqualIgnoreCase(tableName));
            if (tableName == null) return null;

            var data = new Dictionary<string, object>(StringComparer.OrdinalIgnoreCase);
            data["Config"] = Config;
            data["Tables"] = tables;
            data["Table"] = table;

            // ����ģ������
            //Template tt = new Template();
            Template.Debug = Config.Debug;
            var templates = new Dictionary<string, string>();
            var tempName = Config.TemplateName;
            var tempKind = "";
            var p = tempName.IndexOf(']');
            if (p >= 0)
            {
                tempKind = tempName.Substring(0, p + 1);
                tempName = tempName.Substring(p + 1);
            }
            if (tempKind == "[����]")
            {
                // ϵͳģ��
                foreach (var item in Templates)
                {
                    var key = item.Key;
                    String name = key.Substring(0, key.IndexOf("."));
                    if (name != tempName) continue;

                    String content = item.Value;

                    // ����ļ�ͷ
                    if (Config.UseHeadTemplate && !String.IsNullOrEmpty(Config.HeadTemplate) && key.EndsWith(".cs", StringComparison.OrdinalIgnoreCase))
                        content = Config.HeadTemplate + content;

                    templates.Add(key.Substring(name.Length + 1), content);
                }
            }
            else
            {
                // �ļ�ģ��
                String dir = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, TemplatePath);
                dir = Path.Combine(dir, tempName);
                String[] ss = Directory.GetFiles(dir, "*.*", SearchOption.TopDirectoryOnly);
                if (ss != null && ss.Length > 0)
                {
                    foreach (String item in ss)
                    {
                        if (item.EndsWith("scc", StringComparison.OrdinalIgnoreCase)) continue;

                        String content = File.ReadAllText(item);

                        String name = item.Substring(dir.Length);
                        if (name.StartsWith(@"\")) name = name.Substring(1);

                        // ����ļ�ͷ
                        if (Config.UseHeadTemplate && !String.IsNullOrEmpty(Config.HeadTemplate) && name.EndsWith(".cs", StringComparison.OrdinalIgnoreCase))
                            content = Config.HeadTemplate + content;

                        templates.Add(name, content);
                    }
                }
            }
            if (templates.Count < 1) throw new Exception("û�п���ģ�棡");

            Template tt = Template.Create(templates);
            if (tempName.StartsWith("*")) tempName = tempName.Substring(1);
            tt.AssemblyName = tempName;

            // ����ģ�档��������Ҫ����ֻ�о����˴�����֪��ģ�����ǲ��Ǳ�������
            tt.Compile();

            List<String> rs = new List<string>();
            foreach (var item in tt.Templates)
            {
                if (item.Included) continue;

                String content = tt.Render(item.Name, data);

                // ��������ļ���
                String fileName = Path.GetFileName(item.Name);
                var fname = Config.UseCNFileName ? table.DisplayName : table.Alias;
                fname = fname.Replace("/", "_").Replace("\\", "_");
                fileName = fileName.Replace("����", fname).Replace("������", fname).Replace("������", Config.EntityConnName);

                fileName = Path.Combine(Config.OutputPath, fileName);

                String dir = Path.GetDirectoryName(fileName);
                if (!Directory.Exists(dir)) Directory.CreateDirectory(dir);
                File.WriteAllText(fileName, content, Encoding.UTF8);

                rs.Add(content);
            }
            return rs.ToArray();
        }

        /// <summary>
        /// Ԥ�����������ȸ��ֶ�������ģ���д��
        /// ��Ϊ��������أ����ԣ�ÿ�θ������ú󣬶�Ӧ�õ���һ�θ÷�����
        /// </summary>
        List<IDataTable> FixTable(List<IDataTable> tables)
        {
            if (tables == null || tables.Count < 1) return tables;

            var type = tables[0].GetType();
            var list = tables.Select(dt => (TypeX.CreateInstance(type) as IDataTable).CopyAllFrom(dt)).ToList();

            var noCNDic = new Dictionary<object, string>();
            var existTrans = new List<string>();

            var mr = ObjectContainer.Current.Resolve<IModelResolver>();
            mr.AutoCutPrefix = Config.AutoCutPrefix;
            mr.AutoCutTableName = Config.AutoCutTableName;
            mr.AutoFixWord = Config.AutoFixWord;
            mr.FilterPrefixs = Config.Prefix.Split(',', ';');
            mr.UseID = Config.UseID;

            #region ��������
            foreach (var table in list)
            {
                table.Alias = mr.GetAlias(table.Name);

                if (String.IsNullOrEmpty(table.Description))
                    noCNDic.Add(table, table.Alias);
                else
                    AddExistTranslate(existTrans, !string.IsNullOrEmpty(table.Alias) ? table.Alias : table.Name, table.Description);

                // �ֶ�
                foreach (var dc in table.Columns)
                {
                    dc.Alias = mr.GetAlias(dc);

                    if (String.IsNullOrEmpty(dc.Description))
                        noCNDic.Add(dc, dc.Alias);
                    else
                        AddExistTranslate(existTrans, !string.IsNullOrEmpty(dc.Alias) ? dc.Alias : dc.Name, dc.Description);
                }

                //table.Fix();
            }

            ModelHelper.Connect(list);
            #endregion

            #region �첽���ýӿ�����������
            //if (Config.UseCNFileName && noCNDic.Count > 0)
            if (noCNDic.Count > 0)
            {
                ThreadPoolX.QueueUserWorkItem(TranslateWords, noCNDic);
            }
            #endregion

            #region �ύ�ѷ������Ŀ
            if (existTrans.Count > 0)
            {
                ThreadPoolX.QueueUserWorkItem(SubmitTranslateNew, existTrans.ToArray());
            }
            #endregion

            return list;
        }

        void TranslateWords(Object state)
        {
            var dic = state as Dictionary<Object, String>;

            //ITranslate trs = new BingTranslate();
            string[] words = new string[dic.Values.Count];
            dic.Values.CopyTo(words, 0);
            String[] rs = Translate.Translate(words);
            if (rs == null || rs.Length < 1) return;

            var ts = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
            for (int i = 0; i < words.Length && i < rs.Length; i++)
            {
                String key = words[i].Replace(" ", null);
                if (!ts.ContainsKey(key) && !String.IsNullOrEmpty(rs[i]) && words[i] != rs[i] && key != rs[i].Replace(" ", null)) ts.Add(key, rs[i].Replace(" ", null));
            }

            foreach (var item in dic)
            {
                if (!ts.ContainsKey(item.Value) || String.IsNullOrEmpty(ts[item.Value])) continue;

                if (item.Key is IDataTable)
                    (item.Key as IDataTable).Description = ts[item.Value];
                else if (item.Key is IDataColumn)
                    (item.Key as IDataColumn).Description = ts[item.Value];
            }
        }

        void SubmitTranslateNew(object state)
        {
            string[] existTrans = state as string[];
            if (existTrans != null && existTrans.Length > 0)
            {
                //var serv = new NnhyServiceTranslate();
                Translate.TranslateNew("1", existTrans);
                var trans = new List<string>(ExistSubmitTrans);
                trans.AddRange(existTrans);
                ExistSubmitTrans = trans.ToArray();
            }
        }

        private static string[] _ExistSubmitTrans;
        private static string[] ExistSubmitTrans
        {
            get
            {
                if (_ExistSubmitTrans == null)
                {
                    string f = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.CommonApplicationData), "XCoder");
                    f = Path.Combine(f, "SubmitedTranslations.dat");
                    if (File.Exists(f))
                    {
                        _ExistSubmitTrans = File.ReadAllLines(f);
                    }
                    else
                    {
                        _ExistSubmitTrans = new string[] { };
                    }
                }
                return _ExistSubmitTrans;
            }
            set
            {
                if (value != null && value.Length > 0)
                {
                    string f = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.CommonApplicationData), "XCoder");
                    if (!Directory.Exists(f)) Directory.CreateDirectory(f);
                    f = Path.Combine(f, "SubmitedTranslations.dat");
                    File.WriteAllLines(f, value);
                    _ExistSubmitTrans = value;
                }
            }
        }

        void AddExistTranslate(List<string> trans, string text, string tranText)
        {
            if (text != null) text = text.Trim();
            if (tranText != null) tranText = tranText.Trim();
            if (string.IsNullOrEmpty(text)) return;
            if (string.IsNullOrEmpty(tranText)) return;
            if (text.Equals(tranText, StringComparison.OrdinalIgnoreCase)) return;

            for (int i = 0; i < trans.Count; i += 2)
            {
                if (trans[i].Equals(text, StringComparison.OrdinalIgnoreCase) &&
                    trans[i + 1].Equals(tranText, StringComparison.OrdinalIgnoreCase))
                {
                    return;
                }
            }

            for (int i = 0; i < ExistSubmitTrans.Length; i += 2)
            {
                if (ExistSubmitTrans[i].Equals(text, StringComparison.OrdinalIgnoreCase) &&
                    ExistSubmitTrans[i + 1].Equals(tranText, StringComparison.OrdinalIgnoreCase))
                {
                    return;
                }
            }

            trans.Add(text);
            trans.Add(tranText);
        }
        #endregion
    }
}