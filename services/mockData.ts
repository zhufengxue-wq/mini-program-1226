import { UserProfile, ServiceItem, Project, LifeItem, LoveFunProfile, HighVibeEvent } from '../types';

export const USER_PROFILE: UserProfile = {
  nickname: "Miffy",
  allianceId: "WA-1024",
  // Asian Female
  avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop", 
  wonderPoints: 1425900, 
  flowDescription: "我享受设计游戏化的平台产品，用投资思维看世界，在高维智慧中探索生命的无限可能。",
  location: "中国 · 深圳",
  tags: ["超级个体", "高维智慧"],
  assets: [
    { projectName: "Omni Yard · 静安共创空间", sharePercentage: 0.055, value: 45000, trend: 12.5 },
    { projectName: "AI 艺术策展小组", sharePercentage: 0.12, value: 8600, trend: 5.2 },
    { projectName: "神奇学校 · 线上平台", sharePercentage: 0.02, value: 1200, trend: -1.0 }
  ]
};

// New Love & Fun Profile Data
export const LOVE_FUN_PROFILE: LoveFunProfile = {
  intro: "我是一个把生活当「艺术实验」来玩的女孩：用穿搭、旅行、音乐、运动和高维智慧，一点点把自己调到最开心的频率。",
  sections: [
    {
      id: 'style',
      title: "让我开心的穿搭是",
      iconType: "Palette",
      items: [
        { label: "舒适风", text: "" },
        { label: "贵妇风+时尚配饰", text: "" },
        { label: "简约运动", text: "" }
      ]
    },
    {
      id: 'body',
      title: "让我的身体兴奋健康的体验是",
      iconType: "Activity",
      items: [
         { label: "全球旅游高尔夫", text: "" },
         { label: "每周两次普拉提", text: "" },
         { label: "阿勒泰滑雪", text: "" }
      ]
    },
    {
       id: 'joy',
       title: "让我感到愉快的体验是",
       iconType: "Sparkles",
       items: [
          { label: "和可爱的孩子一起露营", text: "" },
          { label: "听民谣音乐", text: "" },
          { label: "观看脱口秀表演", text: "" },
          { label: "日本参加艺术节", text: "" },
          { label: "买到精致的个护产品", text: "" },
          { label: "佩戴艺术家珠宝", text: "" },
          { label: "看温暖的友情日剧", text: "" }
       ]
    }
  ]
};

// --- NEW: Miffy's Owned Service (Golf) ---
export const MIFFY_GOLF_SERVICE: ServiceItem = {
    id: 's_miffy_golf',
    providerName: "Miffy",
    providerAvatar: USER_PROFILE.avatar,
    category: 'Body',
    serviceTitle: "高尔夫心流 · 绅士运动入门",
    price: 1200,
    pointsGift: 120,
    tags: ["高尔夫教学", "身心合一", "高端社交"],
    image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=500&h=600&fit=crop",
    description: "不仅仅是挥杆，更是一场关于专注力与身体控制的修行。在蓝天绿地间，带你通过高尔夫进入心流状态。",
    isOwner: true,
    totalSales: 15600,
    orders: [
      { id: 'ord_01', buyerName: "Jason", buyerAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop", status: 'paid', timeSlot: "周六 10:00-11:00", income: 1200 },
      { id: 'ord_02', buyerName: "Sarah", buyerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop", status: 'paid', timeSlot: "周六 14:00-15:00", income: 1200 },
      { id: 'ord_03', buyerName: "David", buyerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop", status: 'completed', timeSlot: "上周五 16:00", income: 1200 },
    ]
};

// Magic School Content - Asian Instructors
export const SERVICE_LIST: ServiceItem[] = [
  // Insert Miffy's service first for demo purposes in lists if needed, but primarily for "My Traits"
  MIFFY_GOLF_SERVICE,
  {
    id: 's1',
    providerName: "桃桃导师",
    // Asian Female
    providerAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&h=600&fit=crop", 
    category: 'Mind',
    // Updated Title
    serviceTitle: "我有哪些限制性信念？",
    price: 800,
    pointsGift: 80,
    tags: ["深度对话", "人生教练"],
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=500&h=600&fit=crop",
    // Updated Description
    description: "协助我深度探索内在的负面自我评判想法，童年创伤，剥开限制，走向自洽。"
  },
  {
    id: 's2',
    providerName: "Elisa老师",
    // Asian Female
    providerAvatar: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=500&h=600&fit=crop", 
    category: 'Mind',
    // Updated Title
    serviceTitle: "我的天赋究竟是什么？",
    price: 1299,
    pointsGift: 120,
    tags: ["财富卡点", "天赋变现"],
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=500&h=600&fit=crop",
    // Updated Description
    description: "通过21天的持续引导与社群共能，带我深深的看见自己，我的心之所向，我将对自己的过往人生有一个全方位的复盘，深度理解每一个关键选择，找到自己100%的潜能"
  },
  {
    id: 's_ason',
    providerName: "Ason老师",
    // Asian Male
    providerAvatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=500&h=600&fit=crop", 
    category: 'Energy',
    serviceTitle: "一对一定制化 · 我的智能家居智能生活",
    price: 1500,
    pointsGift: 150,
    tags: ["全屋智能", "生活黑科技"],
    // FIXED: New Smart Home Image
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=500&h=600&fit=crop",
    description: "Ason老师 · 拒绝智商税，为我量身打造懂我的智能空间。从灯光氛围到自动化场景，让科技真正服务于生活的松弛感。"
  },
  {
    id: 's3',
    providerName: "乔治老师",
    // Asian Male (Replaced)
    providerAvatar: "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=500&h=600&fit=crop", 
    category: 'Body',
    serviceTitle: "营养健身运动 · 月度专属辅导计划",
    price: 2500,
    pointsGift: 250,
    tags: ["私人定制", "健康管理"],
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&h=600&fit=crop",
    description: "为我量身定制的饮食与训练计划，全程陪伴式指导，不仅塑造体态，更重塑健康的生活方式。"
  },
  {
    id: 's4',
    providerName: "Sunny老师",
    // Asian Male
    providerAvatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=500&h=600&fit=crop", 
    category: 'Aesthetic',
    serviceTitle: "个人风格与审美重构 · 定制设计",
    price: 3600,
    pointsGift: 360,
    tags: ["形象管理", "服装定制"],
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&h=600&fit=crop",
    description: "基于一对一的深度个人链接，通过色彩与骨骼分析找到我的本命风格，提供专属服装定制设计服务。"
  }
];

// My Talents Projects - Exact titles requested
export const INSPIRATION_PROJECTS: Project[] = [
  {
    id: 'p1',
    // UPDATED: Title and location as requested
    title: "巴厘岛乌布设计师旅居度假别墅群共建",
    location: "印尼 · 乌布",
    image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80",
    leader: {
      name: "Miffy", // Updated to Miffy as Owner
      avatar: USER_PROFILE.avatar
    },
    progress: 35,
    estReturn: "房费分红",
    coBuildNeed: "空间设计",
    memberAvatars: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop", 
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop"  
    ],
    description: "在艺术圣地 Ubud 打造专属于数字游民与设计师的灵感补给站。融合热带现代主义与可持续建筑理念，重新定义旅居生活。",
    tags: ["建筑设计", "空间运营", "旅居地产"],
    // DASHBOARD DATA
    isOwner: true,
    valuation: "4,500w",
    yieldRate: "12.5%",
    investors: [
      { id: "inv1", name: "Alex", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop", role: "天使投资人", equity: "15%", contributionType: "Money", contributionValue: "¥600w", status: "active" },
      { id: "inv2", name: "Sarah", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop", role: "景观设计", equity: "5%", contributionType: "Talent", contributionValue: "Design", status: "active" },
      { id: "inv3", name: "Ken", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop", role: "运营总监", equity: "8%", contributionType: "Talent", contributionValue: "Ops", status: "pending" },
    ]
  },
  {
    id: 'p2',
    title: "巴厘岛神奇学校旗舰校区共建",
    location: "印尼 · 乌布",
    // FIXED: New Bamboo Architecture Image
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
    leader: {
      name: "Master T",
      // Asian Male (Replaced)
      avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=200&h=200&fit=crop" 
    },
    progress: 15,
    estReturn: "学费收益",
    coBuildNeed: "课程研发",
    memberAvatars: [
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop" // Asian Female
    ],
    description: "坐落于乌布稻田间的未来学校。以自然为师，融合东西方智慧，重塑全龄段的生命教育体验，打造全球身心疗愈地标。",
    tags: ["自然建筑", "全龄教育", "身心疗愈"]
  },
  {
    id: 'p3',
    title: "开心诊所",
    location: "线上 · 云端",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80",
    leader: {
      name: "Dr. Joy",
      // Asian Female
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop" 
    },
    progress: 60,
    estReturn: "服务分成",
    coBuildNeed: "专业医师",
    memberAvatars: [
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" // Asian Female
    ],
    // UPDATED DESCRIPTION
    description: "提供上门陪伴式开心活动，让青少年可以在开心中得到健康的疗愈。",
    tags: ["开心活动", "心理陪伴", "青少年疗愈"]
  },
  {
    id: 'p4',
    title: "神奇联盟自治理组织",
    location: "Web3 · 全球",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
    leader: {
      name: "Satoshi",
      // Asian Male
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop" 
    },
    progress: 88,
    estReturn: "去中心化治理",
    coBuildNeed: "社区共识",
    memberAvatars: [
       "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=100&h=100&fit=crop", // Asian Male
       "https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=100&h=100&fit=crop"  // Asian Female
    ],
    description: "真正属于共建者的组织。通过智能合约实现资产透明与决策民主，打破公司制边界，让每一份贡献都被区块链永久铭记。",
    tags: ["去中心化治理", "通证经济", "社区共识"]
  },
  // --- NEW: High Dim Game Dev ---
  {
    id: 'p5',
    title: "高维玩家IP游戏开发",
    location: "深圳 · 科技园",
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80",
    leader: {
      name: "Seven",
      // Asian Male
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop" 
    },
    progress: 10,
    estReturn: "游戏分红",
    coBuildNeed: "Unity开发",
    memberAvatars: [
       "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop", // Asian Female
       "https://images.unsplash.com/photo-1605369796033-bb248643872c?w=100&h=100&fit=crop"  // Asian Male
    ],
    description: "打造首款基于高维智慧的沉浸式RPG，让玩家在修行的副本中通过意识升级获取真实世界的财富与能量。",
    tags: ["独立游戏", "元宇宙", "灵性觉醒"]
  }
];

// Omni Life Items - Replaced Aromatherapy with "True Self Algorithm" E-book
export const LIFE_ITEMS: LifeItem[] = [
  // --- NEW: Pai Wooden House ---
  {
    id: 'space_pai',
    type: 'Space',
    title: "泰国拜县 · 稻田悬空木屋",
    subTitle: "在云雾与稻浪中醒来 · 避世疗愈",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
    tag: "野奢民宿",
    price: 480,
    location: "泰国 · 拜县",
    hostName: "Somchai",
    hostAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop"
  },
  // --- NEW: Uluwatu Villa ---
  {
    id: 'space_uluwatu',
    type: 'Space',
    title: "巴厘岛 · 乌鲁瓦图悬崖别墅",
    subTitle: "独享印度洋落日 · 顶级冲浪视野",
    image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80",
    tag: "度假别墅",
    price: 2800,
    location: "印尼 · 乌鲁瓦图",
    hostName: "Sari",
    hostAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop"
  },
  {
    id: 'good_algorithm',
    type: 'Good',
    title: "真我算法 · 电子书",
    subTitle: "你以为在生活其实你在渲染",
    // Abstract / Digital Art Image
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
    tag: "数字出版",
    price: 68, 
    location: "线上发售",
    hostName: "Neo",
    // Asian Male
    hostAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop" 
  },
  {
    id: 'good2',
    type: 'Good',
    title: "艺术家手作陶具孤品",
    subTitle: "独一无二 · 灵魂容器",
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80",
    tag: "艺术收藏",
    price: 1680,
    location: "线上商店",
    hostName: "Chen",
    // Asian Female (Replaced)
    hostAvatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&h=200&fit=crop" 
  },
  {
    id: 'good_book',
    type: 'Good',
    title: "舒适经济学 · 限量版实体书",
    subTitle: "重新定义你的生活与财富关系",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80",
    tag: "知识资产",
    price: 88,
    location: "线上发售",
    hostName: "Author Li",
    // Asian Male
    hostAvatar: "https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?w=200&h=200&fit=crop" 
  },
  {
    id: 'event_art',
    type: 'Event',
    title: "深圳蛇口 · 先锋数字艺术展",
    subTitle: "光影与算法的沉浸式对话",
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&q=80",
    tag: "艺术展览",
    price: 168,
    time: "周二-周日, 10:00-18:00",
    location: "深圳 · 蛇口海上世界",
    hostName: "Curator Fan",
    // Asian Female
    hostAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop" 
  },
  {
    id: 'event_golf',
    type: 'Event',
    title: "中山温泉高尔夫组团",
    subTitle: "商务社交 · 挥杆果岭",
    image: "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=800&q=80",
    tag: "高端运动",
    price: 1280,
    time: "周日, 09:00",
    location: "中山 · 温泉高尔夫",
    hostName: "Tiger",
    // Asian Male (Replaced)
    hostAvatar: "https://images.unsplash.com/photo-1605369796033-bb248643872c?w=200&h=200&fit=crop" 
  },
  {
    id: 'event_concert',
    type: 'Event',
    title: "深圳湾 · 草地烛光音乐会",
    subTitle: "星空下的古典乐疗愈",
    // FIXED: New Concert Image
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80",
    tag: "音乐现场",
    price: 188,
    time: "周六, 20:00",
    location: "深圳 · 深圳湾公园",
    hostName: "Music Lab",
    // Asian Female
    hostAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop" 
  },
  {
    id: 'event_ski',
    type: 'Event',
    title: "北海道滑雪旅行组团",
    subTitle: "二世谷 · 寻找雪友 · AA拼团",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
    tag: "旅行搭子",
    price: "免费组队",
    time: "12月-2月, 随时出发",
    location: "日本 · 北海道",
    hostName: "Ken",
    // Asian Male
    hostAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop" 
  },
  {
    id: 'event_zumba',
    type: 'Event',
    title: "深圳湾线下尊巴舞蹈聚会",
    subTitle: "释放多巴胺 · 快乐暴汗",
    image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=800&q=80",
    tag: "运动社交",
    price: "Free",
    time: "每周三, 19:30",
    location: "深圳 · 深圳湾",
    hostName: "Coco",
    // Asian Female
    hostAvatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop" 
  },
  {
    id: 'event_techno',
    type: 'Event',
    title: "深圳 Techno 日落派对",
    subTitle: "日落与节奏 · 灵魂共振",
    // FIXED: New Techno Party Image
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",
    tag: "音乐派对",
    price: 128,
    time: "周五, 19:00",
    location: "深圳 · 南山",
    hostName: "DJ Jin",
    // Asian Female
    hostAvatar: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=200&h=200&fit=crop" 
  },
  {
    id: 'event_pickle',
    type: 'Event',
    title: "深圳匹克球聚会",
    subTitle: "新手友好 · 潮流运动",
    // FIXED: New Sporty Image (Reliable)
    image: "https://images.unsplash.com/photo-1627589993339-a9a7a976865d?w=800&q=80",
    tag: "匹克球",
    price: "AA场地费",
    time: "周六, 16:00",
    location: "深圳 · 福田",
    hostName: "Ming",
    // Asian Male (Replaced)
    hostAvatar: "https://images.unsplash.com/photo-1590086782792-42dd2350140d?w=200&h=200&fit=crop" 
  },
  {
    id: 'event_talent',
    type: 'Event',
    title: "深圳线下天赋挖掘训练分享",
    subTitle: "找到你的天才区域 · 深度链接",
    // FIXED: New Workshop Image (Reliable)
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    tag: "个人成长",
    price: "Free",
    time: "周日, 14:00",
    location: "深圳 · 华侨城",
    hostName: "Sarah",
    // Asian Female
    hostAvatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop" 
  }
];

// Updated Nourish Services: Reverting to Smart Home (s_ason) and Fitness (s3) as requested
export const NOURISH_SERVICES = [
  SERVICE_LIST.find(s => s.id === 's_ason'),
  SERVICE_LIST.find(s => s.id === 's3'),
].filter(Boolean).map(s => ({
  ...s,
  title: s!.serviceTitle, // Map serviceTitle to title for generic usage
  matchReason: s!.category === 'Energy' ? '#空间能量' : '#身体活力', 
  rewardPoints: s!.pointsGift
}));

// Updated High Vibe Events: Zumba (event_zumba), Golf (event_golf), Ceramics (good2)
export const HIGH_VIBE_EVENTS: HighVibeEvent[] = [
  {
    id: 'event_zumba',
    title: "深圳湾线下尊巴舞蹈聚会",
    image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=800&q=80",
    joinedAvatars: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop", // Asian Female
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop", // Asian Female
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop"  // Asian Female
    ]
  },
  {
    id: 'event_golf',
    title: "中山温泉高尔夫组团",
    image: "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=800&q=80",
    joinedAvatars: [
       "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop", // Asian Male
       "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop"  // Asian Male
    ]
  },
  {
    id: 'good2',
    title: "艺术家手作陶具孤品",
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80",
    joinedAvatars: [
       "https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=100&h=100&fit=crop", // Asian Female
       "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop"  // Asian Female
    ]
  }
];