/*************************************

项目名称：Fimo-复古胶片相机
更新日期：2025-01-16
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/fimo\.appfimo\.com\/fimo-.*\/(user|apple\/certificate|config|startPopConfig|filmAll) url script-response-body https://raw.githubusercontent.com/ngp263/woyaofendou/refs/heads/main/fimo.js

[mitm]
hostname = fimo.appfimo.com

*************************************/



var ddm = JSON.parse($response.body);

// 解锁 /fimo-user/user 接口
if (/fimo-user\/user/.test($request.url)) {
    ddm.films.forEach(item => {
        if ('pay' in item) {
            item.pay = 'sync';
        }
    });
    ddm.subscribe = {
        'valid': true,
        'forever': 1,
        'endTime': 0xf3f01c35
    };
    ddm.filmsCommonOrder = ['fimoBlackTea50', 'fimoDiary400', 'fimoLMcolor100_w', 'fimopro_3', 'fimoUltramax400', 'fimoTokyo500_w'];
}

// 过滤掉新用户活动横幅
if (/config/.test($request.url)) {
    ddm.storeBanner = ddm.storeBanner.filter(banner => banner.name !== '新用户抽奖活动');
}

// 清空启动弹窗配置
if (/startPopConfig/.test($request.url)) {
    ddm = {};
}

// 模拟苹果订阅凭证
if (/fimo-user\/apple\/certificate/.test($request.url)) {
    const data = {
        quantity: '1',
        purchase_date_ms: '1694250549000',
        expires_date: '2099-09-09 09:09:09 Etc/GMT',
        expires_date_pst: '2099-09-09 06:06:06 America/Los_Angeles',
        is_in_intro_offer_period: 'false',
        transaction_id: '490001314520000',
        is_trial_period: 'false',
        original_transaction_id: '490001314520000',
        purchase_date: '2023-09-09 09:09:09 Etc/GMT',
        product_id: 'fimopro_1',
        original_purchase_date_ms: '1694250550000',
        web_order_line_item_id: '490000123456789',
        expires_date_ms: '4092599349000',
        purchase_date_pst: '2023-09-09 02:09:09 America/Los_Angeles',
        original_purchase_date: '2023-09-09 09:09:10 Etc/GMT',
        original_purchase_date_pst: '2023-09-09 02:09:10 America/Los_Angeles',
        in_app_ownership_type: 'PURCHASED'
    };

    ddm.receipt = ddm.receipt || {};
    ddm.receipt.in_app = [data];
    ddm.latest_receipt = 'ddm1023';
    ddm.latest_receipt_info = [Object.assign({}, data, {
        subscription_group_identifier: '20919732'
    })];
    ddm.pending_renewal_info = [{
        product_id: 'fimopro_1',
        original_transaction_id: '490001314520000',
        auto_renew_product_id: 'fimopro_1',
        auto_renew_status: '1'
    }];
}

$done({ body: JSON.stringify(ddm) });
