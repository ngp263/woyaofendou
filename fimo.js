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



if ($response?.body) {
    let body = $response.body;
    let url = $request.url;
    let ddm = JSON.parse(body);

    // 解锁 /user 接口：film 的 pay 字段，添加会员信息
    if (/fimo-user\/user/.test(url)) {
        if (ddm?.films?.length > 0) {
            ddm.films.forEach(film => {
                if ('pay' in film) film.pay = 'sync';
            });
        }
        ddm.subscribe = {
            valid: true,
            forever: true,
            endTime: 4092599349000
        };
    }

    // 隐藏 config 广告横幅
    if (/config/.test(url)) {
        if (Array.isArray(ddm?.storeBanner)) {
            ddm.storeBanner = ddm.storeBanner.filter(item => item.name !== '新用户抽奖活动');
        }
    }

    // 清除启动弹窗
    if (/startPopConfig/.test(url)) {
        ddm = {};
    }

    // 模拟苹果订阅
    if (/fimo-user\/apple\/certificate/.test(url)) {
        const data = {
            quantity: '1',
            product_id: 'fimopro_1',
            transaction_id: '490001314520000',
            original_transaction_id: '490001314520000',
            purchase_date_ms: '1694250549000',
            original_purchase_date_ms: '1694250550000',
            expires_date: '2099-09-09 09:09:09 Etc/GMT',
            expires_date_ms: '4092599349000',
            is_trial_period: 'false',
            in_app_ownership_type: 'PURCHASED',
        };

        ddm.receipt = { in_app: [data] };
        ddm.latest_receipt = 'fake_receipt';
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
} else {
    $done({});
}
