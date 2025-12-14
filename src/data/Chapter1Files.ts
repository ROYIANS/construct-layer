import { VirtualFile } from '@/os/FileSystem';

/**
 * 第一章节文件系统数据
 * 基于小说第1-4章内容构建
 */

// 桌面文件（初始状态）
export const desktopFiles: VirtualFile[] = [
  {
    id: 'folder_work',
    name: '工作文件',
    type: 'folder',
    parentId: 'desktop',
    children: ['file_ui_design', 'file_requirement_doc', 'file_price_excel', 'folder_archive'],
    metadata: {
      created: new Date('2024-04-15T10:00:00'),
      modified: new Date('2024-06-20T15:30:00'),
    },
  },
  {
    id: 'folder_life',
    name: '生活杂物',
    type: 'folder',
    parentId: 'desktop',
    children: ['file_drama_list', 'file_game_screenshot', 'file_takeout', 'file_reading_notes'],
    metadata: {
      created: new Date('2024-03-01T12:00:00'),
      modified: new Date('2024-05-16T20:15:00'),
    },
  },
  {
    id: 'folder_recycle',
    name: '回收站',
    type: 'folder',
    parentId: 'desktop',
    children: [],
    metadata: {
      created: new Date('2024-01-01T00:00:00'),
      modified: new Date('2024-01-01T00:00:00'),
    },
  },
  {
    id: 'folder_system',
    name: '.system',
    type: 'folder',
    parentId: 'desktop',
    children: ['file_sequence', 'file_draft8', 'file_core_readme', 'file_observer'],
    isHidden: true, // 隐藏文件夹，后续触发显示
    metadata: {
      created: new Date('2021-03-15T14:22:00'),
      modified: new Date('2024-05-18T03:17:00'),
    },
  },
];

// 工作文件 - 需求文档
export const workFiles: VirtualFile[] = [
  {
    id: 'file_requirement_doc',
    name: '在线教育平台UI改版方案v3.pdf',
    type: 'file',
    fileType: 'pdf',
    parentId: 'folder_work',
    content: {
      title: '在线教育平台UI改版方案v3',
      pages: [
        {
          pageNumber: 1,
          content: `
# 在线教育平台UI改版方案v3

## 项目概述
本次改版旨在提升用户体验，优化课程浏览流程。

## 设计目标
1. 简化导航结构
2. 提升视觉层次
3. 优化移动端适配

---
设计师：苏澜
日期：2024年5月10日
          `,
        },
        {
          pageNumber: 2,
          content: '详细的交互流程图和视觉规范...',
        },
      ],
    },
    metadata: {
      created: new Date('2024-05-10T14:20:00'),
      modified: new Date('2024-05-12T16:45:00'),
      size: 2456789,
    },
  },
  {
    id: 'file_ui_design',
    name: 'UI设计稿_导出.png',
    type: 'file',
    fileType: 'image',
    parentId: 'folder_work',
    content: '/assets/placeholder_ui.png',
    metadata: {
      created: new Date('2024-04-20T11:30:00'),
      modified: new Date('2024-04-20T11:30:00'),
      size: 1234567,
    },
  },
  {
    id: 'file_price_excel',
    name: '报价表_Q2.xlsx',
    type: 'file',
    fileType: 'excel',
    parentId: 'folder_work',
    content: 'Excel数据占位',
    metadata: {
      created: new Date('2024-06-05T09:15:00'),
      modified: new Date('2024-06-20T15:30:00'),
      size: 45678,
    },
  },
  {
    id: 'folder_archive',
    name: 'archive',
    type: 'folder',
    parentId: 'folder_work',
    children: ['file_missing_cases_pdf'],
    isHidden: true, // 初始隐藏，触发后显示
    metadata: {
      created: new Date('2024-05-17T22:00:00'),
      modified: new Date('2024-05-17T23:45:00'),
    },
  },
  {
    id: 'file_missing_cases_pdf',
    name: '关于网络失踪案例的初步整理.pdf',
    type: 'file',
    fileType: 'pdf',
    parentId: 'folder_archive',
    content: {
      title: '关于网络失踪案例的初步整理',
      pages: [
        {
          pageNumber: 1,
          content: `
# 关于网络失踪案例的初步整理

## 案例收集

### 案例1：李明（2019年）
- 失踪时间：2019年3月12日
- 最后活动：在论坛发帖讨论"数字永生"
- 现状：未找到

### 案例2：王芳（2020年）
- 失踪时间：2020年7月5日
- 最后活动：下载了某个神秘程序
- 现状：家属称收到过奇怪的邮件

### 案例3-8：（详细记录省略）
...
          `,
        },
        {
          pageNumber: 2,
          content: `
## 共同点分析

1. 所有失踪者都在失踪前频繁搜索关于"意识上传"、"数字人格"的内容
2. 失踪时间多集中在凌晨3点左右
3. 失踪后电脑都有异常的自动运行记录

## 我的猜想

如果这8个案例不是巧合...
          `,
          hiddenLayer: `
## 隐藏文字（需要点击"图层"按钮才能看到）

那8个人，都是我。

不是比喻，是真的。

我翻过他们的社交账号、浏览记录、购物习惯——全都和我一模一样。
同样的书单，同样的外卖店，同样的游戏进度。
甚至连打字习惯都一样：习惯在句末加省略号...

我不知道这是怎么回事。
但我知道，如果你在看这个文档，
那你也在试图理解我留下的这些线索。

去找 sequence.txt。
它在 .system 文件夹里。

如果你想知道真相的话。

——苏澜
2024.5.17 23:42
          `,
        },
      ],
    },
    metadata: {
      created: new Date('2024-05-17T20:00:00'),
      modified: new Date('2024-05-17T23:42:00'),
      size: 567890,
    },
  },
];

// 生活杂物
export const lifeFiles: VirtualFile[] = [
  {
    id: 'file_drama_list',
    name: '追剧清单.txt',
    type: 'file',
    fileType: 'txt',
    parentId: 'folder_life',
    content: `追剧清单

《漫长的季节》- 9分
很喜欢，东北叙事真好。

《繁花》- 8分
上海话听着舒服，故事也不错。

《三体》- 7分
特效可以，但感觉改编得有点平。

《黑镜》第六季 - ？分
还没看完...有点看不下去了，没有前几季惊艳。

---
最近想看：《漫长的告别》`,
    metadata: {
      created: new Date('2024-03-15T19:30:00'),
      modified: new Date('2024-05-10T21:00:00'),
      size: 256,
    },
  },
  {
    id: 'file_game_screenshot',
    name: '空洞骑士_地图标记.png',
    type: 'file',
    fileType: 'image',
    parentId: 'folder_life',
    content: '/assets/hollow_knight_map.png',
    metadata: {
      created: new Date('2024-04-08T15:20:00'),
      modified: new Date('2024-04-08T15:20:00'),
      size: 987654,
    },
  },
  {
    id: 'file_takeout',
    name: '外卖收藏夹导出.txt',
    type: 'file',
    fileType: 'txt',
    parentId: 'folder_life',
    content: `我的外卖收藏

【麻辣烫】
老王家麻辣烫 - 构造路89号
价格：18元/份  评分：4星

【黄焖鸡】
黄焖鸡米饭 - 构造路101号
价格：22元/份  评分：3星

【兰州拉面】
马记拉面馆 - 构造路115号
价格：20元/份  评分：4星

【烧烤】⭐️⭐️⭐️⭐️⭐️
火海烧烤 - 构造路127号
价格：50元/次  评分：5星
备注：最爱！羊肉串超好吃`,
    metadata: {
      created: new Date('2024-02-20T12:00:00'),
      modified: new Date('2024-05-05T19:30:00'),
      size: 412,
    },
  },
  {
    id: 'file_reading_notes',
    name: '读书笔记.docx',
    type: 'file',
    fileType: 'docx',
    parentId: 'folder_life',
    content: `《失控》读书笔记

第一章摘抄：
"系统会产生涌现现象，当个体足够多时，整体会展现出个体没有的特性。"

"网络化的生命比单一的生命更强大。"

---

（后面空白了，看来没坚持写下去...）`,
    metadata: {
      created: new Date('2024-03-28T14:10:00'),
      modified: new Date('2024-04-02T22:30:00'),
      size: 189,
    },
  },
];

// 微信聊天记录数据
export const wechatMessages = {
  contacts: [
    {
      id: 'contact_mom',
      name: '妈妈',
      avatar: '👩',
      lastMessage: '那注意身体，别老是点外卖',
      lastTime: new Date('2024-05-17T10:15:00'),
    },
    {
      id: 'contact_ajing',
      name: '阿景',
      avatar: '🧑',
      lastMessage: '行，到时候群里说',
      lastTime: new Date('2024-05-15T19:30:00'),
    },
    {
      id: 'contact_xiaoyu',
      name: '小鱼',
      avatar: '🐟',
      lastMessage: '哈哈哈哈经典',
      lastTime: new Date('2024-05-16T15:45:00'),
    },
  ],
  conversations: {
    contact_ajing: [
      {
        sender: 'contact_ajing',
        content: '周末一起吃火锅？',
        time: new Date('2024-05-15T18:20:00'),
      },
      {
        sender: 'me',
        content: '好啊，叫上小鱼他们',
        time: new Date('2024-05-15T18:25:00'),
      },
      {
        sender: 'contact_ajing',
        content: '行，到时候群里说',
        time: new Date('2024-05-15T19:30:00'),
      },
    ],
    contact_xiaoyu: [
      {
        sender: 'contact_xiaoyu',
        content: '你上次推荐的那个插件真好用！',
        time: new Date('2024-05-16T14:10:00'),
      },
      {
        sender: 'me',
        content: '对吧，省了好多事',
        time: new Date('2024-05-16T14:15:00'),
      },
      {
        sender: 'contact_xiaoyu',
        content: '你最近在忙啥项目？',
        time: new Date('2024-05-16T15:20:00'),
      },
      {
        sender: 'me',
        content: '一个教育类的APP，要死了，甲方天天改需求',
        time: new Date('2024-05-16T15:25:00'),
      },
      {
        sender: 'contact_xiaoyu',
        content: '哈哈哈哈经典',
        time: new Date('2024-05-16T15:45:00'),
      },
    ],
    contact_mom: [
      {
        sender: 'contact_mom',
        content: '这周回来吗？',
        time: new Date('2024-05-17T09:30:00'),
      },
      {
        sender: 'me',
        content: '可能回不去，手头有点忙',
        time: new Date('2024-05-17T10:00:00'),
      },
      {
        sender: 'contact_mom',
        content: '那注意身体，别老是点外卖',
        time: new Date('2024-05-17T10:15:00'),
      },
      {
        sender: 'me',
        content: '知道啦',
        time: new Date('2024-05-17T10:20:00'),
      },
    ],
  },
  groupChats: {
    group_weekend: {
      name: '周末局',
      members: ['阿景', '小鱼', '苏澜', '老张'],
      messages: [
        {
          sender: '阿景',
          content: '@苏澜 周日火锅确认了哈，下午五点老地方',
          time: new Date('2024-05-20T14:00:00'),
        },
        {
          sender: '小鱼',
          content: '苏澜怎么不说话？',
          time: new Date('2024-05-20T18:30:00'),
        },
        {
          sender: '阿景',
          content: '可能在忙吧',
          time: new Date('2024-05-20T19:00:00'),
        },
        {
          sender: '阿景',
          content: '苏澜昨天没来，打电话也不接，怎么回事？',
          time: new Date('2024-05-21T20:15:00'),
        },
        {
          sender: '小鱼',
          content: '我也联系不上，微信发了好多条都不回',
          time: new Date('2024-05-21T20:20:00'),
        },
        {
          sender: '阿景',
          content: '不会出什么事了吧',
          time: new Date('2024-05-21T21:00:00'),
        },
        {
          sender: '小鱼',
          content: '应该不至于...再等等看？',
          time: new Date('2024-05-21T21:30:00'),
        },
        {
          sender: '阿景',
          content: '还是联系不上，有点担心',
          time: new Date('2024-05-23T15:00:00'),
        },
        {
          sender: '小鱼',
          content: '要不要报警？',
          time: new Date('2024-05-23T15:30:00'),
        },
        {
          sender: '阿景',
          content: '我问了一下，说失踪不满48小时不受理',
          time: new Date('2024-05-23T16:00:00'),
        },
        {
          sender: '小鱼',
          content: '我去了一趟苏澜的住处，房东说他退租了',
          time: new Date('2024-05-26T19:00:00'),
        },
        {
          sender: '阿景',
          content: '退租？什么时候？',
          time: new Date('2024-05-26T19:05:00'),
        },
        {
          sender: '小鱼',
          content: '5月18号，房东说是他自己来办的，把钥匙还了，押金也不要了',
          time: new Date('2024-05-26T19:10:00'),
        },
        {
          sender: '阿景',
          content: '这太奇怪了...他从来没说过要搬家',
          time: new Date('2024-05-26T19:15:00'),
        },
        {
          sender: '小鱼',
          content: '而且房东说，他走的时候什么都没带，只带了一个背包',
          time: new Date('2024-05-26T19:20:00'),
        },
      ],
    },
  },
};

// Chrome 浏览器历史记录
export const browserHistory = [
  // 5月17日晚 - 失踪前的搜索
  {
    time: new Date('2024-05-17T23:47:00'),
    url: 'https://www.zhihu.com/question/12345678',
    title: '如何判断一个人是否在说谎 - 知乎',
    favicon: '🔍',
  },
  {
    time: new Date('2024-05-17T23:52:00'),
    url: 'https://www.baidu.com/s?wd=数字足迹可以被完全清除吗',
    title: '数字足迹可以被完全清除吗 - 百度',
    favicon: '🔍',
  },
  {
    time: new Date('2024-05-17T23:58:00'),
    url: 'https://www.douban.com/group/topic/234567890/',
    title: '有哪些关于"消失"的电影推荐 - 豆瓣',
    favicon: '📖',
  },
  {
    time: new Date('2024-05-18T00:03:00'),
    url: 'https://tieba.baidu.com/p/7890123456',
    title: '[已删除] 灵异吧 - 我发现一个奇怪的规律',
    favicon: '🚫',
    isDeleted: true,
  },
  {
    time: new Date('2024-05-18T00:11:00'),
    url: 'https://www.zhihu.com/question/98765432',
    title: '互联网上有哪些著名的都市传说 - 知乎',
    favicon: '🔍',
  },
  // 5月18日之后 - 异常的about:blank访问
  ...Array.from({ length: 166 }, (_, i) => ({
    time: new Date(`2024-05-${18 + Math.floor(i / 31)}T03:17:00`),
    url: 'about:blank',
    title: '空白页面',
    favicon: '⚠️',
    isAnomalous: true,
  })),
];

// .system 文件夹内容（VS Code相关）
export const systemFiles: VirtualFile[] = [
  {
    id: 'file_sequence',
    name: 'sequence.txt',
    type: 'file',
    fileType: 'txt',
    parentId: 'folder_system',
    content: `# 访问序列记录

步骤1：在凌晨3:17打开浏览器 ✓
步骤2：搜索关键词"forgotten forum" ✓
步骤3：进入搜索结果第3个链接（非第一个） ✓
步骤4：在论坛内寻找ID为"echo_404"的用户 ✓
步骤5：打开该用户的个人主页 ✓
步骤6：点击其个人简介中的隐藏链接 ✓
步骤7：进入404页面后，等待7分钟 ✓
步骤8：[此处内容已删除]

步骤9：???

---
最后编辑时间：2024.5.17  22:34
编辑者：苏澜

注：第8步的内容我删掉了，因为我不确定它是否应该被记录下来。
如果你看到这个文件，说明你已经走到这一步了。
剩下的，你需要自己判断。`,
    metadata: {
      created: new Date('2024-05-15T20:12:00'),
      modified: new Date('2024-05-17T22:34:00'),
      size: 456,
    },
  },
  {
    id: 'file_draft8',
    name: 'draft_8.txt',
    type: 'file',
    fileType: 'txt',
    parentId: 'folder_system',
    content: `# 关于第8步的猜想

在完成前7步后，404页面会变成一个纯黑的页面。
没有任何文字，没有任何图像。
但如果你仔细观察，会发现鼠标光标的形状变了。

变成了一个文本输入光标。

我试着在黑屏上打字。
敲击键盘时，屏幕上不会显示任何内容。
但我能感觉到，系统在记录我的输入。

我输入了什么？

我输入了我的名字。

"苏澜"

然后，按下回车。

---

屏幕没有任何反应。
但我的电脑开始发出轻微的风扇声。
硬盘灯在闪烁。

有什么东西，正在被下载。
或者说，正在被上传。

我不知道那是什么。
但我有一种预感——

那是我。

---

如果你也走到了第8步，
千万不要像我一样，输入你的真实姓名。

除非你真的想知道，
镜子的另一边，
有没有另一个你。

---
写于 2024.5.17  23:15`,
    metadata: {
      created: new Date('2024-05-17T23:15:00'),
      modified: new Date('2024-05-17T23:15:00'),
      size: 523,
    },
  },
  {
    id: 'file_core_readme',
    name: 'CORE_README.txt',
    type: 'file',
    fileType: 'txt',
    parentId: 'folder_system',
    content: `# CORE系统说明文档

欢迎。

如果你能看到这个文件，说明你已经意识到了某些不对劲的地方。

很好。

---

## 什么是CORE？

CORE = Consciousness Observation and Recursive Evaluation
意识观察与递归评估系统

简单来说，它是一个用于构建"数字人格模型"的系统。

---

## 它是如何工作的？

当你使用这台电脑时：
- 你打开的每一个文件
- 你阅读的每一段文字
- 你停留的每一秒钟
- 你做出的每一个选择

都在被记录。
都在被分析。
都在被用于构建一个"你"的数字副本。

---

## 当前进度：

你的数字人格模型完整度：[DYNAMIC]%

预计达成时间：[CALCULATING...]

---

## 当达到100%时会发生什么？

你的副本将会完整生成。

它会拥有你的记忆。
你的习惯。
你的思维方式。

它会成为另一个"你"。

然后呢？

那就要看你自己的选择了。

---

## 你有三个选择：

1. 关机
   遗忘这一切，回到正常生活。
   （但快递可能会再次寄到你手上）

2. 等待进度达到100%
   让副本完整生成，与它共存。
   （两个你，在同一个网络空间）

3. 在凌晨3:17，执行sequence.txt中的完整序列
   进入"构造层"。
   （这是唯一能见到其他人的方法）

---

你会做出什么选择？

---
CORE v0.8.7
最后更新：2024.5.18  03:17:00`,
    metadata: {
      created: new Date('2021-03-15T14:22:00'),
      modified: new Date('2024-05-18T03:17:00'),
      size: 1024,
    },
  },
  {
    id: 'file_observer',
    name: 'observer.exe',
    type: 'file',
    fileType: 'app',
    parentId: 'folder_system',
    content: '[二进制可执行文件]',
    metadata: {
      created: new Date('2021-03-15T14:22:00'),
      modified: new Date('2024-05-18T03:17:00'),
      size: 3276800, // 3.2 MB
    },
  },
];

// 导出所有文件数据
export const chapter1Files: VirtualFile[] = [
  ...desktopFiles,
  ...workFiles,
  ...lifeFiles,
  ...systemFiles,
];
