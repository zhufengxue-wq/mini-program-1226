<template>
  <view class="page-container">
    <!-- 顶部背景氛围光 (Ambient Light) -->
    <view class="ambient-glow"></view>

    <!-- 1. 灵魂名片 (Identity Mirror) -->
    <!-- 设计哲学：首屏不卖货，先“照镜子”。确认“我是谁”，建立高能心理暗示。 -->
    <view class="header-section">
      <view class="glass-card identity-card">
        <view class="user-info-row">
          <view class="avatar-wrapper">
            <image :src="currentUser.avatar" mode="aspectFill" class="avatar" />
            <view class="status-ring"></view> <!-- 高能光圈 -->
          </view>
          <view class="meta-info">
            <text class="greeting">Alex，欢迎回到你的高能状态。</text>
            <view class="tags-row">
              <text class="tag" v-for="(tag, index) in currentUser.tags" :key="index"># {{ tag }}</text>
            </view>
          </view>
        </view>
        
        <view class="divider"></view>
        
        <view class="flow-quote-box">
          <text class="quote-mark">“</text>
          <text class="flow-text">{{ currentUser.flowDescription }}</text>
          <text class="quote-mark-end">”</text>
          <text class="quote-label">—— 你的心流时刻</text>
        </view>
      </view>
    </view>

    <!-- 2. 今日滋养 (Nourish You / Support System) -->
    <!-- 设计哲学：先给予后索取。系统因了解你而推荐，让用户感到“被支持”。 -->
    <view class="section-container">
      <view class="section-header">
        <text class="section-title">支持你爱自己</text>
        <text class="section-subtitle">Support System</text>
      </view>
      
      <scroll-view scroll-x="true" class="horizontal-scroll" :show-scrollbar="false">
        <view class="scroll-inner">
          <view class="nourish-card" v-for="item in nourishServices" :key="item.id">
            <view class="card-image-box">
              <image :src="item.image" mode="aspectFill" class="card-img" />
              <view class="match-tag">
                <text class="match-icon">✨</text>
                <text>{{ item.matchReason }}</text>
              </view>
            </view>
            <view class="card-content">
              <text class="service-title">{{ item.title }}</text>
              <view class="card-footer">
                <text class="wp-reward">+{{ item.rewardPoints }} WP (爱自己)</text>
                <view class="action-btn-small">预约</view>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- 3. 天赋舞台 (The Stage / Inspiration Economy) -->
    <!-- 设计哲学：个性化召唤。不是“招聘”，而是“我们需要你的独特能量”。 -->
    <view class="section-container">
      <view class="section-header">
        <text class="section-title">你的天赋被需要</text>
        <text class="section-subtitle">Inspiration Economy</text>
      </view>

      <view class="hero-card" v-for="project in talentProjects" :key="project.id">
        <image :src="project.image" mode="aspectFill" class="hero-bg" />
        <view class="hero-overlay">
          <view class="hero-content">
            <view class="location-badge">
              <text class="icon">📍</text> {{ project.location }}
            </view>
            <text class="hero-title">{{ project.title }}</text>
            
            <!-- 动态召唤文案：这是击穿用户心理防线的关键 -->
            <view class="personal-call">
              <text class="call-text">@{{ currentUser.nickname }}，乌布别墅项目需要你的 </text>
              <text class="highlight-skill">[{{ currentUser.tags[0] }}]</text>
              <text class="call-text"> 天赋。</text>
            </view>
            
            <button class="cta-btn-primary">
              <text>以天赋入股 / 共建</text>
              <text class="arrow"> →</text>
            </button>
          </view>
        </view>
      </view>
    </view>

    <!-- 4. 同频部落 (High Vibe Tribe) -->
    <!-- 设计哲学：社交证明。展示同频伙伴的状态，激发归属感。Story 风格。 -->
    <view class="section-container">
      <view class="section-header">
        <text class="section-title">你的高维生活方式</text>
        <text class="section-subtitle">High Vibe Tribe</text>
      </view>
      
      <view class="masonry-grid">
        <view class="vibe-card" v-for="event in highVibeEvents" :key="event.id">
          <image :src="event.image" mode="aspectFill" class="vibe-img" />
          <view class="vibe-content">
            <text class="vibe-title">{{ event.title }}</text>
            <view class="social-proof">
              <view class="avatar-stack">
                <image v-for="(url, i) in event.joinedAvatars" :key="i" :src="url" class="mini-avatar" :style="{zIndex: 10-i}" />
              </view>
              <text class="social-text">你的 3 位同频伙伴已加入</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 底部占位，防止被 Tabbar 遮挡 -->
    <view style="height: 100px;"></view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// --- Part 1: Mock Data Definition ---

// 1. Current User: 极具个性化的画像
const currentUser = ref({
  id: 'u001',
  nickname: 'Alex',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
  tags: ['空间设计师', '冥想爱好者'],
  wonderPoints: 1250,
  // 用户的“高光时刻”描述，这是Mirror的核心
  flowDescription: '在深夜听着海浪声画图时，我感到与宇宙同频。' 
});

// 2. Nourish Services: 智能匹配逻辑
const nourishServices = ref([
  {
    id: 's1',
    title: '肩颈能量流瑜伽',
    image: 'https://images.unsplash.com/photo-1544367563-12123d8966bf?w=400&h=300&fit=crop',
    matchReason: '给设计师的身体充电', // 对应 "空间设计师"
    rewardPoints: 50
  },
  {
    id: 's2',
    title: 'Theta脑波灵感冥想',
    image: 'https://images.unsplash.com/photo-1515023115689-589c33041697?w=400&h=300&fit=crop',
    matchReason: '为冥想爱好者定制', // 对应 "冥想爱好者"
    rewardPoints: 30
  },
  {
    id: 's3',
    title: '有机饮食排毒周',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
    matchReason: '恢复身体原生能量',
    rewardPoints: 80
  }
]);

// 3. Talent Projects: 英雄之旅的召唤
const talentProjects = ref([
  {
    id: 'p1',
    title: '巴厘岛 · 乌布竹林别墅共建',
    location: 'Indonesia, Bali',
    image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop',
    // 动态召唤词在 Template 中组合
  }
]);

// 4. High Vibe Events: 社交信号
const highVibeEvents = ref([
  {
    id: 'e1',
    title: '深圳湾 · 日落颂钵音疗会',
    image: 'https://images.unsplash.com/photo-1596766723236-02a8eb3c7c3b?w=400&h=500&fit=crop',
    joinedAvatars: [
      'https://randomuser.me/api/portraits/women/44.jpg',
      'https://randomuser.me/api/portraits/men/32.jpg',
      'https://randomuser.me/api/portraits/women/68.jpg'
    ]
  }
]);

</script>

<style scoped lang="scss">
/* --- Design Variables --- */
$primary-orange: #FF8C00;
$primary-green: #2E8B57;
$bg-warm: #FFFBF0;
$text-dark: #1A1A1A;
$text-grey: #666666;
$glass-bg: rgba(255, 255, 255, 0.65);
$glass-border: rgba(255, 255, 255, 0.9);
$shadow-soft: 0 8px 24px rgba(0, 0, 0, 0.04);
$shadow-hover: 0 12px 30px rgba(255, 140, 0, 0.15);

/* --- Global Layout --- */
.page-container {
  min-height: 100vh;
  background-color: $bg-warm;
  padding: 0 32rpx;
  padding-top: 88rpx; /* Status bar space */
  position: relative;
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, sans-serif;
  color: $text-dark;
}

/* 顶部氛围光 */
.ambient-glow {
  position: absolute;
  top: -100rpx;
  right: -100rpx;
  width: 500rpx;
  height: 500rpx;
  background: radial-gradient(circle, rgba(255, 140, 0, 0.15) 0%, rgba(255, 255, 255, 0) 70%);
  z-index: 0;
  pointer-events: none;
}

/* --- Section 1: Identity Mirror --- */
.header-section {
  position: relative;
  z-index: 10;
  margin-bottom: 48rpx;
}

.glass-card {
  background: $glass-bg;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid $glass-border;
  border-radius: 32rpx;
  padding: 40rpx;
  box-shadow: $shadow-soft;
}

.user-info-row {
  display: flex;
  align-items: center;
  margin-bottom: 32rpx;
}

.avatar-wrapper {
  position: relative;
  margin-right: 24rpx;
}

.avatar {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  border: 2px solid #fff;
}

.status-ring {
  position: absolute;
  top: -4rpx;
  left: -4rpx;
  right: -4rpx;
  bottom: -4rpx;
  border-radius: 50%;
  border: 1px solid $primary-orange;
  opacity: 0.6;
  animation: breathe 3s infinite ease-in-out;
}

@keyframes breathe {
  0% { transform: scale(1); opacity: 0.6; }
  50% { transform: scale(1.05); opacity: 0.3; }
  100% { transform: scale(1); opacity: 0.6; }
}

.meta-info {
  flex: 1;
}

.greeting {
  font-size: 32rpx;
  font-weight: 600;
  color: $text-dark;
  margin-bottom: 12rpx;
  display: block;
}

.tags-row {
  display: flex;
  gap: 12rpx;
}

.tag {
  font-size: 22rpx;
  color: $primary-green;
  background: rgba(46, 139, 87, 0.08);
  padding: 4rpx 12rpx;
  border-radius: 8rpx;
  font-weight: 500;
}

.divider {
  height: 1px;
  background: rgba(0,0,0,0.05);
  margin-bottom: 24rpx;
}

.flow-quote-box {
  position: relative;
  padding: 0 16rpx;
}

.quote-mark, .quote-mark-end {
  font-family: serif;
  font-size: 40rpx;
  color: $primary-orange;
  opacity: 0.5;
  line-height: 1;
}

.flow-text {
  font-size: 28rpx;
  color: $text-dark;
  font-style: italic;
  line-height: 1.6;
  margin: 0 8rpx;
}

.quote-label {
  display: block;
  text-align: right;
  font-size: 22rpx;
  color: $text-grey;
  margin-top: 12rpx;
}

/* --- Section Headers --- */
.section-container {
  margin-bottom: 56rpx;
}

.section-header {
  margin-bottom: 24rpx;
  display: flex;
  flex-direction: column;
}

.section-title {
  font-size: 36rpx;
  font-weight: 700;
  color: $text-dark;
  letter-spacing: -0.5px;
}

.section-subtitle {
  font-size: 20rpx;
  text-transform: uppercase;
  color: #999;
  letter-spacing: 1px;
  margin-top: 4rpx;
}

/* --- Section 2: Nourish (Horizontal Scroll) --- */
.horizontal-scroll {
  width: 100%;
  white-space: nowrap;
}

.scroll-inner {
  display: flex;
  padding-bottom: 20rpx; /* Space for shadow */
}

.nourish-card {
  width: 300rpx;
  height: 420rpx;
  background: #fff;
  border-radius: 24rpx;
  margin-right: 24rpx;
  flex-shrink: 0;
  box-shadow: $shadow-soft;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
}

.card-image-box {
  height: 220rpx;
  position: relative;
}

.card-img {
  width: 100%;
  height: 100%;
}

.match-tag {
  position: absolute;
  bottom: 12rpx;
  left: 12rpx;
  background: rgba(255, 255, 255, 0.95);
  padding: 6rpx 16rpx;
  border-radius: 20rpx;
  font-size: 20rpx;
  color: $primary-orange;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4rpx;
}

.card-content {
  padding: 20rpx;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.service-title {
  font-size: 28rpx;
  font-weight: 600;
  white-space: normal; /* Allow title wrap */
  line-height: 1.4;
}

.card-footer {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.wp-reward {
  font-size: 20rpx;
  color: $primary-orange;
}

.action-btn-small {
  text-align: center;
  background: #f5f5f5;
  color: $text-dark;
  font-size: 22rpx;
  padding: 8rpx 0;
  border-radius: 30rpx;
}

/* --- Section 3: The Talent Stage (Hero) --- */
.hero-card {
  width: 100%;
  height: 600rpx;
  border-radius: 32rpx;
  overflow: hidden;
  position: relative;
  box-shadow: $shadow-soft;
}

.hero-bg {
  width: 100%;
  height: 100%;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0) 20%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.85) 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 40rpx;
}

.location-badge {
  background: rgba(255,255,255,0.2);
  backdrop-filter: blur(4px);
  color: #fff;
  font-size: 20rpx;
  display: inline-flex;
  align-items: center;
  padding: 6rpx 16rpx;
  border-radius: 100rpx;
  align-self: flex-start;
  margin-bottom: 16rpx;
}

.hero-title {
  color: #fff;
  font-size: 40rpx;
  font-weight: 700;
  margin-bottom: 24rpx;
  line-height: 1.2;
}

.personal-call {
  margin-bottom: 32rpx;
  background: rgba(255, 140, 0, 0.1);
  border-left: 4rpx solid $primary-orange;
  padding: 12rpx 16rpx;
  backdrop-filter: blur(4px);
}

.call-text {
  color: #eee;
  font-size: 26rpx;
  line-height: 1.5;
}

.highlight-skill {
  color: $primary-orange;
  font-weight: 700;
  font-size: 28rpx;
}

.cta-btn-primary {
  background: $primary-green;
  color: #fff;
  border-radius: 50rpx;
  height: 88rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30rpx;
  font-weight: 600;
  width: 100%;
  border: none;
  box-shadow: 0 4px 12px rgba(46, 139, 87, 0.4);
}

.arrow {
  margin-left: 8rpx;
  transition: transform 0.2s;
}

.cta-btn-primary:active {
  transform: scale(0.98);
}

/* --- Section 4: High Vibe Tribe --- */
.vibe-card {
  background: #fff;
  border-radius: 24rpx;
  overflow: hidden;
  box-shadow: $shadow-soft;
  margin-bottom: 24rpx;
}

.vibe-img {
  width: 100%;
  height: 360rpx; /* Tall image for story feel */
}

.vibe-content {
  padding: 24rpx;
}

.vibe-title {
  font-size: 30rpx;
  font-weight: 600;
  margin-bottom: 20rpx;
  display: block;
}

.social-proof {
  display: flex;
  align-items: center;
}

.avatar-stack {
  display: flex;
  margin-right: 16rpx;
}

.mini-avatar {
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
  border: 1px solid #fff;
  margin-left: -12rpx;
}

.mini-avatar:first-child {
  margin-left: 0;
}

.social-text {
  font-size: 22rpx;
  color: $text-grey;
}

</style>