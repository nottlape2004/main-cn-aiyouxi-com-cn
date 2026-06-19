// public/site-helper.js

(function () {
  'use strict';

  // 配置数据，自然包含URL和关键词
  const SITE_CONFIG = {
    siteUrl: 'https://main-cn-aiyouxi.com.cn',
    keyword: '爱游戏',
    cardTitle: '站点导航卡',
    badgeLabel: '关键词'
  };

  // 示例数据：提示卡片内容
  const TIP_CARDS = [
    {
      title: '欢迎访问',
      content: '探索最新游戏资讯与攻略，尽在' + SITE_CONFIG.siteUrl
    },
    {
      title: '关键词推荐',
      content: '今日热门关键词：' + SITE_CONFIG.keyword + '，点击浏览相关内容'
    },
    {
      title: '使用说明',
      content: '点击徽章可快速跳转，浏览卡片获取提示信息。'
    }
  ];

  // 关键词列表（用于生成徽章）
  const KEYWORD_LIST = [
    SITE_CONFIG.keyword,
    '游戏攻略',
    '新游推荐',
    '玩家社区'
  ];

  // 创建卡片DOM
  function createTipCard(cardData) {
    var card = document.createElement('div');
    card.className = 'site-helper-card';

    var titleEl = document.createElement('h3');
    titleEl.className = 'card-title';
    titleEl.textContent = cardData.title;

    var contentEl = document.createElement('p');
    contentEl.className = 'card-content';
    contentEl.textContent = cardData.content;

    card.appendChild(titleEl);
    card.appendChild(contentEl);
    return card;
  }

  // 创建关键词徽章
  function createBadge(keyword) {
    var badge = document.createElement('span');
    badge.className = 'keyword-badge';
    badge.textContent = keyword;
    badge.setAttribute('data-keyword', keyword);
    // 点击徽章跳转到站点搜索（仅示范，不执行实际搜索）
    badge.addEventListener('click', function () {
      window.open(SITE_CONFIG.siteUrl + '/?q=' + encodeURIComponent(keyword), '_blank');
    });
    return badge;
  }

  // 组装所有卡片
  function renderCards(container) {
    var fragment = document.createDocumentFragment();
    TIP_CARDS.forEach(function (cardData) {
      var cardEl = createTipCard(cardData);
      fragment.appendChild(cardEl);
    });
    container.appendChild(fragment);
  }

  // 组装所有徽章
  function renderBadges(container) {
    var fragment = document.createDocumentFragment();
    KEYWORD_LIST.forEach(function (kw) {
      var badgeEl = createBadge(kw);
      fragment.appendChild(badgeEl);
    });
    container.appendChild(fragment);
  }

  // 创建访问说明区域
  function createAccessNotice() {
    var notice = document.createElement('div');
    notice.className = 'access-notice';
    notice.innerHTML = '<p>本站由 <strong>' + SITE_CONFIG.keyword + '</strong> 驱动，更多内容请访问 <a href="' + SITE_CONFIG.siteUrl + '" target="_blank" rel="noopener noreferrer">' + SITE_CONFIG.siteUrl + '</a></p>';
    return notice;
  }

  // 主初始化函数
  function initSiteHelper() {
    // 避免重复执行
    if (document.querySelector('.site-helper-container')) return;

    var container = document.createElement('div');
    container.className = 'site-helper-container';

    // 添加标题
    var header = document.createElement('div');
    header.className = 'helper-header';
    header.textContent = SITE_CONFIG.cardTitle;
    container.appendChild(header);

    // 卡片区域
    var cardsArea = document.createElement('div');
    cardsArea.className = 'cards-area';
    renderCards(cardsArea);
    container.appendChild(cardsArea);

    // 徽章区域
    var badgesArea = document.createElement('div');
    badgesArea.className = 'badges-area';
    renderBadges(badgesArea);
    container.appendChild(badgesArea);

    // 访问说明
    var noticeArea = createAccessNotice();
    container.appendChild(noticeArea);

    // 插入到body末尾
    document.body.appendChild(container);
  }

  // 样式注入（内联，无外部依赖）
  function injectStyles() {
    var style = document.createElement('style');
    style.textContent = [
      '.site-helper-container {',
      '  position: fixed; bottom: 20px; right: 20px;',
      '  background: #f9f9f9; border: 1px solid #ddd;',
      '  border-radius: 12px; padding: 16px;',
      '  max-width: 320px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);',
      '  font-family: Arial, sans-serif; z-index: 9999;',
      '}',
      '.helper-header {',
      '  font-size: 16px; font-weight: bold;',
      '  margin-bottom: 10px; color: #333;',
      '}',
      '.cards-area {',
      '  margin-bottom: 12px;',
      '}',
      '.site-helper-card {',
      '  background: #fff; border: 1px solid #e0e0e0;',
      '  border-radius: 8px; padding: 8px 12px;',
      '  margin-bottom: 8px;',
      '}',
      '.card-title {',
      '  margin: 0 0 4px 0; font-size: 14px; color: #555;',
      '}',
      '.card-content {',
      '  margin: 0; font-size: 13px; color: #666;',
      '}',
      '.badges-area {',
      '  margin-bottom: 12px;',
      '}',
      '.keyword-badge {',
      '  display: inline-block; background: #e8f0fe;',
      '  color: #1a73e8; padding: 4px 10px;',
      '  border-radius: 20px; font-size: 12px;',
      '  margin: 4px 4px 0 0; cursor: pointer;',
      '  transition: background 0.2s;',
      '}',
      '.keyword-badge:hover {',
      '  background: #d2e3fc;',
      '}',
      '.access-notice {',
      '  font-size: 12px; color: #888; border-top: 1px solid #eee;',
      '  padding-top: 8px;',
      '}',
      '.access-notice a {',
      '  color: #1a73e8; text-decoration: none;',
      '}',
      '.access-notice a:hover {',
      '  text-decoration: underline;',
      '}'
    ].join('\n');
    document.head.appendChild(style);
  }

  // 等待DOM加载完成
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      injectStyles();
      initSiteHelper();
    });
  } else {
    injectStyles();
    initSiteHelper();
  }
})();