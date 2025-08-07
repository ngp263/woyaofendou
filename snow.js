/******************************************
 * @Name 𝑆𝑁𝑂𝑊 𝐴𝐼
 * @Description 𝑈𝑛𝑙𝑜𝑐𝑘 𝑉𝐼𝑃 𝐹𝑒𝑎𝑡𝑢𝑟𝑒𝑠
 * @Author 𝐻𝑎𝑢𝑠𝑑𝑜𝑟𝑓𝑓
 * @Update 20240622
 * @Version 13.2.5
 ******************************************
[rewrite_local]
# > 𝑆𝑁𝑂𝑊 𝐴𝐼 𝐶𝑟𝑎𝑐𝑘 𝑉𝐼𝑃
^https?:\/\/user-snow-api\.snow\.me\/v1\/purchase\/subscription\/subscriber\/status$ url script-response-body https://raw.githubusercontent.com/ngp263/woyaofendou/refs/heads/main/snow.js
hostname = user-snow-api.snow.me
******************************************/

// 原始响应体解析
let rawBody = $response.body;
let json = JSON.parse(rawBody);

// 清空 entitlement 字段（如果存在）
json.subscriber.entitlements = {};

// 获取最后一个订阅记录对象
let latestSubscription = json.subscriber.subscriptions[
    json.subscriber.entitlement_ids[json.subscriber.entitlement_ids.length - 1]
];

// 修改订阅记录为有效状态
latestSubscription.is_sandbox = true;
latestSubscription.original_purchase_date = "2022-12-29T00:00:00Z";
latestSubscription.purchase_date = 1672243199000;
latestSubscription.store = "app_store";
latestSubscription.expires_date = 32503391999000;

// 覆盖原始订阅数据
json.subscriber.subscriptions[
    json.subscriber.entitlement_ids[json.subscriber.entitlement_ids.length - 1]
] = latestSubscription;

// 设置 entitlement 为解锁
json.subscriber.entitlements = {
    [json.subscriber.entitlement_ids[json.subscriber.entitlement_ids.length - 1]]: latestSubscription
};

json.subscriber.subscribed = true;

// 输出修改后的 JSON 响应体
$done({ body: JSON.stringify(json) });
