import { DialogLine } from './DialogBox';

export const chapter1Script: DialogLine[] = [
    {
        id: 's1',
        text: '2024年11月3日。',
        autoContinue: true,
        waitAfter: 1500,
        backgroundAction: 'fade-to-black'
    },
    {
        id: 's2',
        text: '你收到一封用来取件的顺丰通知。',
        speaker: '旁白'
    },
    {
        id: 's3',
        text: '寄件人：林秋（地址：杭州市西湖区文三路127号）',
        speaker: '系统',
        soundEffect: 'notification'
    },
    {
        id: 's4',
        text: '你并不认识什么林秋。',
    },
    {
        id: 's5',
        text: '打电话给快递员，对方说是房东委托寄的，里面是租客留下的东西。',
    },
    {
        id: 's6',
        text: '“反正东西到了，你爱要不要。”',
        speaker: '快递员'
    },
    {
        id: 's7',
        text: '……你还是去取了。',
    },
    {
        id: 's8',
        text: '（撕开胶带的声音）',
        speaker: '动作',
        autoContinue: true,
        waitAfter: 1000
    },
    {
        id: 's9',
        text: '箱子不大，很旧。里面是一台黑色的 ThinkPad 笔记本电脑。',
    },
    {
        id: 's10',
        text: '没有纸条，没有说明。',
    },
    {
        id: 's11',
        text: '只有电脑外壳上一张褪色的蓝色小鲸鱼贴纸。',
    },
    {
        id: 's12',
        text: '你把电脑放在桌上，按下了开机键。',
    },
    {
        id: 's13',
        text: '……',
        autoContinue: true,
        waitAfter: 2000,
        backgroundAction: 'show-desktop' // Trigger actual Desktop mount here
    }
];
