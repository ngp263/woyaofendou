/******************************************
 * @Name 𝑆𝑁𝑂𝑊 𝐴𝐼
 * @Description 𝑈𝑛𝑙𝑜𝑐𝑘 𝑉𝐼𝑃 𝐹𝑒𝑎𝑡𝑢𝑟𝑒𝑠
 * @Channel https://t.me/yqc_123
 * @Author 𝐻𝑎𝑢𝑠𝑑𝑜𝑟𝑓𝑓
 * @Update 20240622
 * @Link http://t.cn/A6QSe5Tf
 * @Version 13.2.5
 ******************************************
[rewrite_local]
# > 𝑆𝑁𝑂𝑊 𝐴𝐼 𝐶𝑟𝑎𝑐𝑘 𝑉𝐼𝑃
^https?:\/\/user-snow-api\.snow\.me\/v1\/purchase\/subscription\/subscriber\/status$ url script-response-body https://gist.githubusercontent.com/yqc007/034c05da1ff6866612290bfe3b148618/raw/SnowAIVip.js
[mitm] 
hostname = user-snow-api.snow.me
******************************************/

(function() {
    const json = JSON.parse($response.body);
    const subscriber = json.subscriber;

    // 假定获取最后一个订阅条目
    const entitlementKeys = Object.keys(subscriber.entitlements);
    const lastKey = entitlementKeys[entitlementKeys.length - 1];
    const entry = subscriber.entitlements[lastKey];

    // 修改订阅状态
    entry.is_active = true;
    entry.product_identifier = "com.example.premium"; // 可根据实际 App 自定义
    entry.expires_date_ms = Date.now() + 1000 * 60 * 60 * 24 * 365 * 10; // 10 年后

    // 覆盖原数据
    subscriber.subscriptions[lastKey] = entry;
    subscriber.entitlements[lastKey] = entry;
    subscriber.entitlements.is_subscribed = true;

    $done({ body: JSON.stringify(json) });
})();
