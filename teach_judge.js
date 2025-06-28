(function autoRate() {
    // 获取所有指标分类（pj06xh）
    const pj06xhs = document.getElementsByName("pj06xh");
    
    // 随机选择一个低分点（最低分）
    const lowIndex = Math.floor(Math.random() * pj06xhs.length);

    // 遍历每个指标分类，选择高分或低分
    pj06xhs.forEach((item, index) => {
        const name = `pj0601id_${item.value}`;
        const radios = document.getElementsByName(name);
        
        let selectedOption;
        if (index === lowIndex) {
            // 选最低分（假设最后一个选项为低分）
            selectedOption = radios[1];
        } else {
            // 选最高分（假设第一个选项为最高分）
            selectedOption = radios[0];
        }
        
        if (selectedOption) {
            selectedOption.checked = true;
            selectedOption.dispatchEvent(new Event('change'));
        }
    });

    // 自动填写文本输入框
    document.querySelectorAll('input[type="text"], textarea').forEach(input => {
        input.value = "非常满意";
        input.dispatchEvent(new Event('input'));
    });

    // 自动选择下拉菜单的第一个非禁用选项
    document.querySelectorAll('select').forEach(select => {
        const option = select.querySelector('option:not([disabled])');
        if (option) {
            select.value = option.value;
            select.dispatchEvent(new Event('change'));
        }
    });

    // 自动提交表单（绕过确认弹窗）
    const submitBtn = document.getElementById("tj");
    if (submitBtn) {
        // 绕过 confirm 弹窗（强制返回 true）
        window.confirm = () => true;

        // 模拟点击按钮（触发 saveData 函数）
        submitBtn.click();

        // 等待表单提交后，自动点击确认保存按钮
        const waitForConfirm = setInterval(() => {
            // 假设确认按钮 ID 为 "confirmSave"
            const confirmBtn = document.getElementById("confirmSave") || 
                               document.querySelector("button[type='submit'].confirm");

            if (confirmBtn) {
                clearInterval(waitForConfirm);
                confirmBtn.click(); // 自动点击确认按钮
                console.log("确认按钮已自动点击");
            }
        }, 500); // 每 500ms 检查一次
    } else {
        console.error("提交按钮未找到");
    }
})();
