(function() {
    if (document.getElementById('fms-ultimate-menu')) return;

    // --- DESIGN (一切変更なし) ---
    const css = `
        #fms-ultimate-menu { position: fixed !important; top: 10px; left: 10px; width: 320px; max-height: 90vh; background: #000; color: #ff0000; border: 2px solid #ff0000; border-radius: 8px; font-family: 'Arial Black', sans-serif; z-index: 2147483647; box-shadow: 0 0 30px #ff0000; overflow-y: auto; transition: 0.3s; scrollbar-width: thin; }
        .fms-title { text-align: center; font-weight: bold; border-bottom: 2px solid #ff0000; padding: 15px; cursor: pointer; background: #111; text-shadow: 0 0 10px #ff0000; font-size: 18px; position: sticky; top: 0; z-index: 10; }
        .fms-section { padding: 10px; border-bottom: 1px solid #333; background: #050505; color: #0f0; font-size: 12px; font-weight: bold; text-transform: uppercase; }
        .fms-content { padding: 15px; }
        .fms-item { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; border: 1px solid #ff0000; padding: 8px; border-radius: 10px; box-shadow: inset 0 0 5px #ff0000; background: #000; }
        .fms-btn { width: 100%; background: #200; color: #ff0000; border: 1px solid #ff0000; padding: 8px; border-radius: 5px; cursor: pointer; font-weight: bold; margin-bottom: 2px; transition: 0.2s; }
        .fms-btn:hover { background: #ff0000; color: #000; }
        
        /* 入力エリアのラベル */
        .fms-input-label { font-size: 9px; color: #ff0000; margin-bottom: 2px; margin-left: 5px; display: block; opacity: 0.8; }
        
        /* 入力ボックス・セレクトボックスのデザイン */
        .fms-full-input { width: 100%; background: #111; color: #fff; border: 1px solid #ff0000; border-radius: 4px; font-family: 'Arial', sans-serif; font-size: 14px; text-align: center; padding: 5px 0; margin-bottom: 15px; box-sizing: border-box; outline: none; box-shadow: inset 0 0 8px #500; }
        .fms-full-input:focus { border-color: #fff; box-shadow: 0 0 10px #ff0000; }

        /* セレクトボックス専用スタイル */
        select.fms-full-input { color: #ff0000; font-weight: bold; cursor: pointer; -webkit-appearance: none; -moz-appearance: none; appearance: none; }
        select.fms-full-input option { background: #000; color: #fff; }

        .fms-switch { position: relative; width: 40px; height: 20px; }
        .fms-switch input { opacity: 0; width: 0; height: 0; }
        .fms-slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background: #222; border-radius: 20px; border: 1px solid #ff0000; transition: .3s; }
        .fms-slider:before { position: absolute; content: ""; height: 14px; width: 14px; left: 2px; bottom: 2px; background: #ff0000; border-radius: 50%; transition: .3s; }
        input:checked + .fms-slider { background: #ff0000; }
        input:checked + .fms-slider:before { transform: translateX(20px); background: #000; }
        .fms-range { width: 100%; -webkit-appearance: none; background: #222; border: 1px solid #ff0000; height: 8px; border-radius: 5px; margin: 10px 0; }
        .fms-range::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; background: #ff0000; border-radius: 50%; cursor: pointer; border: 1px solid #fff; }
    `;
    const style = document.createElement('style'); style.innerHTML = css; document.head.appendChild(style);

    const menu = document.createElement('div'); menu.id = 'fms-ultimate-menu';
    menu.innerHTML = `
        <div class="fms-title" id="t-trig">FM-MOD ver3.1</div>
        <div class="fms-content" id="m-cont">
            
            <div class="fms-section">Core Injections</div>
            <button class="fms-btn" id="i_cook">SET COOKIES</button>
            <span class="fms-input-label">COOKIE AMOUNT:</span>
            <input type="number" id="val_cook" class="fms-full-input" value="1000000000000000">
            
            <button class="fms-btn" id="i_lump">SET LUMPS</button>
            <span class="fms-input-label">LUMP AMOUNT:</span>
            <input type="number" id="val_lump" class="fms-full-input" value="1000">
            
            <button class="fms-btn" id="i_chip">SET HEAVENLY</button>
            <span class="fms-input-label">PRESTIGE AMOUNT:</span>
            <input type="number" id="val_chip" class="fms-full-input" value="10000000000">
            
            <div class="fms-section">Automation & Power</div>
            <div class="fms-item"><span>AUTO CLICKER</span> <label class="fms-switch"><input type="checkbox" id="sw_auto"><span class="fms-slider"></span></label></div>
            <div class="fms-item"><span>GOLDEN SPAWNER</span> <label class="fms-switch"><input type="checkbox" id="sw_gold"><span class="fms-slider"></span></label></div>
            
            <div class="fms-section">System Hacks</div>
            <button class="fms-btn" style="background:#500;color:#fff;border-color:#f00;box-shadow:0 0 10px #f00;" id="b_ruin">RUIN THE FUN (FINAL)</button>
            <button class="fms-btn" id="b_achv">UNLOCK ALL ACHIEVS</button>
            <button class="fms-btn" id="b_free">MAKE OBJECTS FREE</button>
            <button class="fms-btn" id="b_dragon">DRAGON MAX LEVEL</button>
            
            <button class="fms-btn" id="b_buff">TRIGGER SELECTED BUFF</button>
            <span class="fms-input-label">SELECT BUFF TYPE:</span>
            <select id="sel_buff" class="fms-full-input">
                <option value="frenzy">Frenzy(7)</option>
                <option value="click frenzy">Click Frenzy(777)</option>
                <option value="elder frenzy">Elder Frenzy / Blood Frenzy(666)</option>
                <option value="dragonflight">Dragonflight(111)</option>
                <option value="dragons harvest">Dragon's Harvest(15)</option>
                <option value="cookie storm">Cookie Storm</option>
                <option value="cookie chain">Cookie Chain</option>
                <option value="cursed finger">Cursed Finger</option>
                <option value="clot">Clot</option>
                <option value="free sugar lump">Sweet</option>
                <option value="blab">Blab</option>
            </select>
            
            <div class="fms-section">Time & Speed Hack</div>
            <div style="font-size:10px;">FPS/CPS CONTROL: <span id="lbl_p">30</span></div>
            <input type="range" min="30" max="600" value="30" class="fms-range" id="sld_fps">
            
            <div class="fms-section">Dangerous Area</div>
            <button class="fms-btn" style="border-color:#fff;" id="b_wipe">DATA WIPE (HARD RESET)</button>
            
            <div style="display:flex; justify-content:space-between; margin-top:15px; font-size:12px; cursor:pointer;">
                <span onclick="document.getElementById('m-cont').style.display='none'">HIDE</span>
                <span onclick="document.getElementById('fms-ultimate-menu').remove()">CLOSE</span>
            </div>
        </div>`;
    document.body.appendChild(menu);

    const $ = (id) => document.getElementById(id);

    // ---  LOGIC OVERRIDE ---
    $('i_cook').onclick = () => { 
        let v = Number($('val_cook').value);
        Game.cookies = v; Game.cookiesEarned = v; Game.UpdateMenu(); Game.Notify('FMS', 'Cookies Injected'); 
    };
    $('i_lump').onclick = () => { 
        let v = Number($('val_lump').value);
        Game.lumps = v; Game.UpdateMenu(); Game.Notify('FMS', 'Lumps Injected'); 
    };
    $('i_chip').onclick = () => { 
        let v = Number($('val_chip').value);
        Game.heavenlyChips = v; Game.UpdateMenu(); Game.Notify('FMS', 'Prestige Injected'); 
    };

    let autoL;
    $('sw_auto').onchange = (e) => {
        if (e.target.checked) autoL = setInterval(Game.ClickCookie, 10);
        else clearInterval(autoL);
    };

    let goldL;
    $('sw_gold').onchange = (e) => {
        if (e.target.checked) {
            goldL = setInterval(() => {
                for(let i=0; i<3; i++) {
                    let newShimmer = new Game.shimmer('golden');
                    newShimmer.pop();
                }
            }, 30);
        } else {
            clearInterval(goldL);
        }
    };

    $('b_achv').onclick = () => { Game.SetAllAchievs(1); Game.Notify('FMS', 'All Achievements Unlocked'); };
    $('b_free').onclick = () => { Game.ObjectsById.forEach(o => o.free = 1); Game.UpdateMenu(); Game.Notify('FMS', 'Objects are FREE'); };
    $('b_dragon').onclick = () => { Game.dragonLevel = 25; Game.UpdateMenu(); Game.Notify('FMS', 'Dragon Transcended'); };
    
    // バフ選択実行ロジック
    $('b_buff').onclick = () => {
        let selectedBuff = $('sel_buff').value;
        let crystal = new Game.shimmer('golden');
        crystal.force = selectedBuff;
        crystal.pop();
        Game.Notify('FMS', `Buff Triggered: ${selectedBuff.toUpperCase()}`);
    };
    
    // 【エラーバグ完全修正済】
    $('b_ruin').onclick = () => { 
        Game.RuinTheFun(); 
        
        Object.keys(Game.buffs).forEach(key => {
            let b = Game.buffs[key];
            if (b) {
                b.multCpS = 1000000000000;
                b.multClick = 1000000000000;
                b.maxTime = 1000000000;
                b.time = 1000000000;
            }
        });
        
        if(Game.Objects['Wizard tower'] && Game.Objects['Wizard tower'].minigame) {
            Game.Objects['Wizard tower'].minigame.getFailChance = () => { return 0; };
        }
        
        let alertCount = 0;
        const systemAlerts = [
            'CRITICAL: MEMORY OVERFLOW', 'SYSTEM COMPROMISED', 'INJECTING MALWARE...', 
            'BYPASSING SECURITY...', 'CORRUPTING GAME DATA...', 'ACCESS GRANTED', 
            'OVERLORD ACTIVE', 'CPS LIMITER BROKEN', 'FUN STATUS: RUINED.',
            'OVERCLOCKING CORES...', 'SYSTEM KERNEL PANIC', 'BUFFER FLOOD DETECTED'
        ];
        
        let floodInterval = setInterval(() => {
            let randomMsg = systemAlerts[Math.floor(Math.random() * systemAlerts.length)];
            let hazardHex = '#' + Math.floor(Math.random()*16777215).toString(16);
            
            Game.Notify(
                `<span style="color:#ff0000; font-family:'Courier New'; font-weight:bold;">[${randomMsg}]</span>`,
                `<span style="color:#fff; font-size:10px;">FRAME_BUFFER_OVERFLOW: ${hazardHex}</span>`,
                [16, 5], 
                1.5
            );
            
            alertCount++;
            if (alertCount >= 600) clearInterval(floodInterval);
        }, 40);
        
        Game.UpdateMenu(); 
    };
    
    $('sld_fps').oninput = (e) => {
        let v = e.target.value;
        $('lbl_p').innerText = v;
        Game.fps = Number(v);
    };

    $('b_wipe').onclick = () => { if(confirm("Are you sure? Everything will be NUKED.")) Game.HardReset(2); };

    $('t-trig').onclick = () => { 
        const c = $('m-cont'); c.style.display = (c.style.display === 'none') ? 'block' : 'none'; 
    };

    Game.Notify('FM-SARGE', 'ULTIMATE OVERLORD LOADED');
})();
