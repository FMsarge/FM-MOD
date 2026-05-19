(function() {
    if (document.getElementById('fms-ultimate-menu')) document.getElementById('fms-ultimate-menu').remove();
    if (document.getElementById('fms-oracle-monitor')) document.getElementById('fms-oracle-monitor').remove();
    if (document.getElementById('fms-esp-canvas')) document.getElementById('fms-esp-canvas').remove();

    if (!window.fmsWrinklerTimers) window.fmsWrinklerTimers = {};

    // --- DESIGN SETTINGS (CSS) ---
    const css = `
        #fms-ultimate-menu { position: fixed !important; top: 10px; left: 10px; width: 320px; max-height: 90vh; background: #000; color: #ff0000; border: 2px solid #ff0000; border-radius: 8px; font-family: 'Arial Black', sans-serif; z-index: 2147483647; box-shadow: 0 0 30px #ff0000; overflow-y: auto; transition: 0.3s; scrollbar-width: thin; }
        #fms-ultimate-menu::-webkit-scrollbar { width: 6px; }
        #fms-ultimate-menu::-webkit-scrollbar-track { background: #000; }
        #fms-ultimate-menu::-webkit-scrollbar-thumb { background: #ff0000; border-radius: 3px; }
        .fms-title { text-align: center; font-weight: bold; border-bottom: 2px solid #ff0000; padding: 15px; cursor: pointer; background: #111; text-shadow: 0 0 10px #ff0000; font-size: 18px; position: sticky; top: 0; z-index: 10; }
        .fms-section { padding: 10px; border-bottom: 1px solid #333; background: #050505; color: #0f0; font-size: 12px; font-weight: bold; text-transform: uppercase; }
        .fms-content { padding: 15px; }
        .fms-item { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; border: 1px solid #ff0000; padding: 8px; border-radius: 10px; box-shadow: inset 0 0 5px #ff0000; background: #000; }
        .fms-btn { width: 100%; background: #200; color: #ff0000; border: 1px solid #ff0000; padding: 8px; border-radius: 5px; cursor: pointer; font-weight: bold; margin-bottom: 5px; transition: 0.2s; }
        .fms-btn:hover { background: #ff0000; color: #000; }
        
        .fms-input-label { font-size: 9px; color: #ff0000; margin-bottom: 2px; margin-left: 5px; display: block; opacity: 0.8; }
        .fms-full-input { width: 100%; background: #111; color: #fff; border: 1px solid #ff0000; border-radius: 4px; font-family: 'Arial', sans-serif; font-size: 14px; text-align: center; padding: 5px 0; margin-bottom: 15px; box-sizing: border-box; outline: none; box-shadow: inset 0 0 8px #500; }
        
        .fms-switch { position: relative; width: 40px; height: 20px; }
        .fms-switch input { opacity: 0; width: 0; height: 0; }
        .fms-slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background: #222; border-radius: 20px; border: 1px solid #ff0000; transition: .3s; }
        .fms-slider:before { position: absolute; content: ""; height: 14px; width: 14px; left: 2px; bottom: 2px; background: #ff0000; border-radius: 50%; transition: .3s; }
        input:checked + .fms-slider { background: #ff0000; }
        input:checked + .fms-slider:before { transform: translateX(20px); background: #000; }
        .fms-range { width: 100%; -webkit-appearance: none; background: #222; border: 1px solid #ff0000; height: 8px; border-radius: 5px; margin: 10px 0; }
        .fms-range::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; background: #ff0000; border-radius: 50%; cursor: pointer; border: 1px solid #fff; }

        #fms-oracle-monitor { position: fixed !important; top: 10px; right: 10px; width: 280px; background: rgba(0,0,0,0.9); color: #0f0; border: 2px solid #0f0; border-radius: 6px; font-family: 'Courier New', monospace; z-index: 2147483646; box-shadow: 0 0 20px rgba(0,255,0,0.5); display: block; padding: 10px; }
        .fms-om-title { text-align: center; font-weight: bold; background: #030; padding: 5px; margin: -10px -10px 10px -10px; border-bottom: 2px solid #0f0; font-size: 14px; cursor: move; color: #0f0; text-shadow: 0 0 5px #0f0; }
        .fms-om-label { font-size: 11px; color: #8f8; font-weight: bold; margin-top: 5px; border-left: 3px solid #0f0; padding-left: 5px; }
        .fms-om-box { background: rgba(0,20,0,0.6); border: 1px dashed #0f0; padding: 6px; font-size: 12px; color: #0ff; margin-bottom: 8px; border-radius: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        
        /* ESP Canvas Overlay */
        #fms-esp-canvas { position: fixed !important; top: 0 !important; left: 0 !important; width: 100vw !important; height: 100vh !important; pointer-events: none; z-index: 2147483645; display: none; margin: 0; padding: 0; }
    `;
    const style = document.createElement('style'); style.innerHTML = css; document.head.appendChild(style);

    // Create Canvas Element
    const canvas = document.createElement('canvas');
    canvas.id = 'fms-esp-canvas';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    function resizeCanvas() { 
        canvas.width = window.innerWidth; 
        canvas.height = window.innerHeight; 
    }
    window.addEventListener('resize', resizeCanvas); 
    window.addEventListener('scroll', resizeCanvas);
    resizeCanvas();

    // --- MAIN MENU HTML ---
    const menu = document.createElement('div'); menu.id = 'fms-ultimate-menu';
    menu.innerHTML = `
        <div class="fms-title" id="t-trig">FM-MOD ver3.1.0</div>
        <div class="fms-content" id="m-cont">
            
            <div class="fms-section">Tactical HUD</div>
            <button class="fms-btn" style="background:#020; color:#0f0; border-color:#0f0; box-shadow:0 0 8px #0f0; margin-bottom: 8px;" id="b_toggle_oracle">TOGGLE GOD'S EYE</button>
            <button class="fms-btn" style="background:#400; color:#ff0000; border-color:#ff0000; box-shadow:0 0 8px #ff0000;" id="b_toggle_esp">TOGGLE WRINKLER ESP</button>

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
            
            <div class="fms-section">Minigame Injectors</div>
            <button class="fms-btn" id="b_inj_swap">1. INJECT SWAPS</button>
            <span class="fms-input-label">SWAP CHARGE AMOUNT:</span>
            <input type="number" id="val_inj_swap" class="fms-full-input" value="3">

            <button class="fms-btn" id="b_inj_stock">2. OVERCLOCK MARKET CAPACITY</button>
            <button class="fms-btn" id="b_stock_tick">3. SPEED DEPLOY (STOCK TICK)</button>

            <div class="fms-section">Automation & Power</div>
            <div class="fms-item"><span>AUTO CLICKER</span> <label class="fms-switch"><input type="checkbox" id="sw_auto"><span class="fms-slider"></span></label></div>
            <div class="fms-item"><span>GOLDEN AUTOMATIC</span> <label class="fms-switch"><input type="checkbox" id="sw_gold"><span class="fms-slider"></span></label></div>
            <div class="fms-item"><span>FREEZE ALL BUFFS</span> <label class="fms-switch"><input type="checkbox" id="sw_freeze_buff"><span class="fms-slider"></span></label></div>
            <div class="fms-item"><span>AUTO POP WRINKLERS</span> <label class="fms-switch"><input type="checkbox" id="sw_wrink"><span class="fms-slider"></span></label></div>
            <button class="fms-btn" id="b_garden">INSTANT GARDEN COMPLETE</button>

            <div class="fms-section">Time Falsification</div>
            <div class="fms-item">
                <span>SUGAR LUMP MACHINEGUN</span> 
                <label class="fms-switch"><input type="checkbox" id="sw_lump_gun"><span class="fms-slider"></span></label>
            </div>
            <button class="fms-btn" id="b_time_add1">ADD +1 YEAR</button>
            <button class="fms-btn" id="b_time_add10">ADD +10 YEARS</button>
            <span class="fms-input-label">TOTAL PLAY DAYS:</span>
            <input type="number" id="val_time_days" class="fms-full-input" value="365">
            <button class="fms-btn" id="b_time_set">SET EXACT DAYS</button>

            <div class="fms-section">System Hacks</div>
            <button class="fms-btn" style="background:#500; color:#fff; border-color:#f00; box-shadow:0 0 10px #f00;" id="b_ruin">RUIN THE FUN (FINAL)</button>
            <button class="fms-btn" id="b_achv">UNLOCK ALL ACHIEVS</button>
            <button class="fms-btn" id="b_free">MAKE OBJECTS FREE</button>
            <button class="fms-btn" id="b_dragon">DRAGON MAX LEVEL</button>
            <button class="fms-btn" style="background:#500; color:#fff; border-color:#f00; box-shadow:0 0 10px #f00;" id="b_wipe">WIPE SAVE</button>
            
            <div class="fms-section">Time & Speed Hack</div>
            <div style="font-size:10px;">FPS/CPS CONTROL: <span id="lbl_p">30</span></div>
            <input type="range" min="30" max="600" value="30" class="fms-range" id="sld_fps">
            
            <div style="display:flex; justify-content:space-between; margin-top:15px; font-size:12px; cursor:pointer;">
                <span onclick="document.getElementById('m-cont').style.display='none'">HIDE</span>
                <span onclick="document.getElementById('fms-ultimate-menu').remove(); document.getElementById('fms-oracle-monitor').remove(); document.getElementById('fms-esp-canvas').remove();">CLOSE</span>
            </div>
        </div>`;
    document.body.appendChild(menu);

    // --- GOD'S EYE MONITOR HTML ---
    const oracleMonitor = document.createElement('div');
    oracleMonitor.id = 'fms-oracle-monitor';
    oracleMonitor.innerHTML = `
        <div class="fms-om-title" id="fms-om-drag">MONITOR</div>
        <div class="fms-om-label">CURRENT COOKIES:</div>
        <div id="orc_cookies" class="fms-om-box" style="color:#fff; font-weight:bold; font-size:13px;">SCANNING...</div>
        <div class="fms-om-label">COOKIES PER SECOND (CPS):</div>
        <div id="orc_cps" class="fms-om-box" style="color:#aaffaa;">SCANNING...</div>
        <div class="fms-om-label">GOLDEN COOKIE TIMER:</div>
        <div id="orc_timer" class="fms-om-box" style="text-align:center; font-weight:bold;">SCANNING...</div>
        <div class="fms-om-label">NEXT SUGAR LUMP TIMER:</div>
        <div id="orc_lump_timer" class="fms-om-box" style="color:#ffbbee;">SCANNING...</div>
        <div class="fms-om-label">ACTIVE WRINKLERS:</div>
        <div id="orc_wrinklers" class="fms-om-box" style="color:#ff7777;">SCANNING...</div>
    `;
    document.body.appendChild(oracleMonitor);

    const $ = (id) => document.getElementById(id);

    // --- MONITOR SYNC LOOP ---
    setInterval(() => {
        try {
            if (typeof Game !== 'undefined') {
                if (typeof Beautify !== 'undefined') {
                    $('orc_cookies').innerText = Beautify(Math.floor(Game.cookies));
                    $('orc_cps').innerText = Beautify(Game.cookiesPs, 1);
                } else {
                    $('orc_cookies').innerText = Math.floor(Game.cookies).toLocaleString();
                    $('orc_cps').innerText = Game.cookiesPs.toLocaleString();
                }

                if (Game.lumpT > 0) {
                    let totalSeconds = Math.max(0, Math.ceil((Game.lumpT - Date.now()) / 1000));
                    if (totalSeconds <= 0) {
                        $('orc_lump_timer').innerHTML = `<span style="color:#ff33ff; text-shadow:0 0 3px #f0f;">MATURED / READY!</span>`;
                    } else {
                        let hrs = Math.floor(totalSeconds / 3600);
                        let mins = Math.floor((totalSeconds % 3600) / 60);
                        let secs = totalSeconds % 60;
                        $('orc_lump_timer').innerText = `${hrs}h ${mins}m ${secs}s left`;
                    }
                } else {
                    $('orc_lump_timer').innerText = "LOCKED / UNKNOWN";
                }

                let activeWrinklers = 0;
                Game.wrinklers.forEach(w => { if (w.phase > 0) activeWrinklers++; });
                $('orc_wrinklers').innerText = `${activeWrinklers} / 12`;
            }

            if (Game.shimmerTypes && Game.shimmerTypes['golden']) {
                let s = Game.shimmerTypes['golden'];
                if (Game.shimmers.length > 0 && Game.shimmers[0].type === 'golden') {
                    $('orc_timer').innerHTML = `<span style="color:#ff3333; text-shadow:0 0 5px #f00;">!! SPAWNED NOW !!</span>`;
                } else {
                    let timeLeft = Math.ceil((s.maxTime - s.time) / Game.fps);
                    let minLeft = Math.ceil((s.minTime - s.time) / Game.fps);
                    if (isNaN(timeLeft) || timeLeft < 0) {
                        $('orc_timer').innerHTML = `<span style="color:#ffaa00;">WAITING...</span>`;
                    } else {
                        let displayMin = Math.max(0, minLeft);
                        $('orc_timer').innerHTML = `<span style="color:#0f0;">${displayMin}s ~ ${timeLeft}s</span>`;
                    }
                }
            }
        } catch(err) { console.log("FMS Monitor Error:", err); }
    }, 200);

    // --- TOGGLE MONITOR ---
    $('b_toggle_oracle').onclick = () => {
        const mon = $('fms-oracle-monitor');
        mon.style.display = (mon.style.display === 'none' || mon.style.display === '') ? 'block' : 'none';
    };

    // --- ESP MOD LOGIC ---
    let espActive = false;
    $('b_toggle_esp').onclick = () => {
        espActive = !espActive;
        const cvs = $('fms-esp-canvas');
        resizeCanvas();
        
        if (espActive) {
            cvs.style.display = 'block';
            $('b_toggle_esp').style.background = '#040';
            $('b_toggle_esp').style.color = '#0f0';
            $('b_toggle_esp').style.borderColor = '#0f0';
            $('b_toggle_esp').style.boxShadow = '0 0 12px #0f0';
            
            if (typeof Game !== 'undefined') {
                Game.Notify('FMS ESP', 'TACTICAL HUD ENGAGED (ver4.6.0)');
            }
        } else {
            cvs.style.display = 'none';
            $('b_toggle_esp').style.background = '#400';
            $('b_toggle_esp').style.color = '#ff0000';
            $('b_toggle_esp').style.borderColor = '#ff0000';
            $('b_toggle_esp').style.boxShadow = '0 0 8px #ff0000';
        }
    };

    // ESP Loop Engine (ver4.6.0: Line + Expanded Box + Distance/Age HUD)
    function renderESP() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        if (espActive && typeof Game !== 'undefined') {
            const startX = window.innerWidth / 2;
            const startY = 0;

            let panelOffsetX = 0;
            if (document.getElementById('leftPanel')) {
                panelOffsetX = document.getElementById('leftPanel').getBoundingClientRect().left;
            }

            const now = Date.now();

            Game.wrinklers.forEach((w, index) => {
                // 虫がいない、またはリセットされたらタイマーを削除
                if (w.phase !== 2) {
                    delete window.fmsWrinklerTimers[index];
                    return;
                }

                if (typeof w.x !== 'undefined' && typeof w.y !== 'undefined') {
                    // 初めて phase 2 になった瞬間に出現時間を記録
                    if (!window.fmsWrinklerTimers[index]) {
                        window.fmsWrinklerTimers[index] = now;
                    }

                    const targetX = w.x + panelOffsetX;
                    const targetY = w.y;

                    // 1. 直線距離の計算 
                    const diffX = targetX - startX;
                    const diffY = targetY - startY;
                    const distance = Math.floor(Math.sqrt(diffX * diffX + diffY * diffY));

                    // 2. 出現してからの秒数の計算
                    const ageSeconds = ((now - window.fmsWrinklerTimers[index]) / 1000).toFixed(1);

                    ctx.beginPath();
                    ctx.moveTo(startX, startY);
                    ctx.lineTo(targetX, targetY);
                    ctx.strokeStyle = 'rgba(255, 0, 0, 0.8)';
                    ctx.lineWidth = 1.8;
                    ctx.stroke();

            
                    const boxSize = 110; 
                    ctx.beginPath();
                    ctx.rect(targetX - (boxSize / 2), targetY - (boxSize / 2), boxSize, boxSize);
                    ctx.strokeStyle = 'rgba(255, 0, 0, 0.85)';
                    ctx.lineWidth = 1.5;
                    ctx.stroke();

                    // 5. タクティカル HUD テキストの描画 (距離 & 出現秒数)
                    ctx.font = 'bold 11px monospace';
                    ctx.fillStyle = '#00ff00'; 
                
                    const textY = targetY + (boxSize / 2) + 14;
                    ctx.fillText(`DST: ${distance}px`, targetX - (boxSize / 2), textY);
                    ctx.fillText(`AGE: ${ageSeconds}s`, targetX - (boxSize / 2), textY + 13);
                }
            });
        }
        requestAnimationFrame(renderESP);
    }
    requestAnimationFrame(renderESP);

    // --- DRAG FUNCTIONALITY ---
    let dragEl = $('fms-oracle-monitor'); let dragHeader = $('fms-om-drag'); let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    dragHeader.onmousedown = (e) => { e = e || window.event; e.preventDefault(); pos3 = e.clientX; pos4 = e.clientY; document.onmouseup = () => { document.onmouseup = null; document.onmousemove = null; }; document.onmousemove = (e) => { e = e || window.event; e.preventDefault(); pos1 = pos3 - e.clientX; pos2 = pos4 - e.clientY; pos3 = e.clientX; pos4 = e.clientY; dragEl.style.top = (dragEl.offsetTop - pos2) + "px"; dragEl.style.left = (dragEl.offsetLeft - pos1) + "px"; dragEl.style.right = "auto"; }; };

    // --- INJECTION LOGIC ---
    $('b_inj_swap').onclick = () => {
        if (Game.Objects['Temple'] && Game.Objects['Temple'].minigame) {
            let mg = Game.Objects['Temple'].minigame;
            let targetSwaps = Math.max(0, Number($('val_inj_swap').value));
            mg.swaps = targetSwaps;
            Game.Notify('FMS TEMPLE', `Pantheon swaps set to [${targetSwaps}]!`);
        } else { Game.Notify('FMS ERROR', 'Temple minigame is not unlocked!'); }
    };

    $('b_inj_stock').onclick = () => {
        if (Game.Objects['Bank'] && Game.Objects['Bank'].minigame) {
            let mg = Game.Objects['Bank'].minigame;
            mg.getGoodMax = function(id) { return 99999; };
            mg.goodsById.forEach(good => good.val = 1);
            Game.buyBulk = 10000;
            Game.Notify('FMS MARKET', 'Capacity 99,999 / Price $1 / Bulk 10,000!');
        } else { Game.Notify('FMS ERROR', 'Bank minigame is not unlocked!'); }
    };

    $('b_stock_tick').onclick = () => {
        if (Game.Objects['Bank'] && Game.Objects['Bank'].minigame) {
            Game.Objects['Bank'].minigame.tickT = 0;
            Game.Notify('FMS MARKET', 'Market cooldown cleared!');
        } else { Game.Notify('FMS ERROR', 'Bank minigame is not unlocked!'); }
    };

    // --- CORE INJECTIONS ---
    $('i_cook').onclick = () => { let v = Number($('val_cook').value); Game.cookies = v; Game.cookiesEarned = v; Game.UpdateMenu(); Game.Notify('FMS', 'Cookies Injected'); };
    $('i_lump').onclick = () => { let v = Number($('val_lump').value); Game.lumps = v; Game.UpdateMenu(); Game.Notify('FMS', 'Lumps Injected'); };
    $('i_chip').onclick = () => { let v = Number($('val_chip').value); Game.heavenlyChips = v; Game.UpdateMenu(); Game.Notify('FMS', 'Prestige Injected'); };

    // --- AUTOMATION LOOP ---
    let autoL; $('sw_auto').onchange = (e) => { if (e.target.checked) autoL = setInterval(Game.ClickCookie, 10); else clearInterval(autoL); };
    
    let goldL; $('sw_gold').onchange = (e) => { 
        if (e.target.checked) {
            goldL = setInterval(() => { 
                for(let i=0; i<2; i++) { (new Game.shimmer('golden')).pop(); }
                Game.shimmers.forEach(shimmer => shimmer.pop());
            }, 500); 
        } else clearInterval(goldL); 
    };

    let freezeBuffL; $('sw_freeze_buff').onchange = (e) => {
        if (e.target.checked) {
            freezeBuffL = setInterval(() => {
                Object.keys(Game.buffs).forEach(key => {
                    let b = Game.buffs[key];
                    if (b) b.time = b.maxTime;
                });
            }, 500);
        } else clearInterval(freezeBuffL);
    };

    let wrinkL; $('sw_wrink').onchange = (e) => { if (e.target.checked) wrinkL = setInterval(() => { Game.wrinklers.forEach(w => { if (w.phase > 0) w.hp = 0; }); }, 100); else clearInterval(wrinkL); };

    // --- TIME FALSIFICATION & SUGAR LUMP MACHINEGUN LOGIC ---
    let lumpGunL;
    $('sw_lump_gun').onchange = (e) => {
        if (e.target.checked) {
            lumpGunL = setInterval(() => {
                if (typeof Game !== 'undefined') {
                    Game.lumpT = Date.now() - (24 * 60 * 60 * 1000); 
                    Game.clickLump();
                }
            }, 10);
            Game.Notify('FMS OVERCLOCK', 'SUGAR LUMP MACHINEGUN ENGAGED!');
        } else {
            clearInterval(lumpGunL);
            Game.Notify('FMS OVERCLOCK', 'SUGAR LUMP MACHINEGUN DISENGAGED.');
        }
    };

    const shiftPlayTime = (ms) => {
        if (typeof Game !== 'undefined') {
            Game.startDate -= ms;
            Game.fullDate -= ms;
            Game.UpdateMenu();
            if (typeof Game.RebuildStats !== 'undefined') Game.RebuildStats();
            Game.Notify('FMS TIME', 'Time warped successfully!');
        }
    };
    const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;

    $('b_time_add1').onclick = () => shiftPlayTime(ONE_YEAR_MS);
    $('b_time_add10').onclick = () => shiftPlayTime(ONE_YEAR_MS * 10);
    $('b_time_set').onclick = () => {
        let days = Number($('val_time_days').value);
        if (isNaN(days) || days < 0) days = 0;
        let msAgo = days * 24 * 60 * 60 * 1000;
        let now = Date.now();
        Game.startDate = now - msAgo;
        Game.fullDate = now - msAgo;
        Game.UpdateMenu();
        if (typeof Game.RebuildStats !== 'undefined') Game.RebuildStats();
        Game.Notify('FMS TIME', `Play time updated to ${days} days!`);
    };

    // --- SYSTEM UTILITIES ---
    $('b_garden').onclick = () => { if (Game.Objects['Farm'] && Game.Objects['Farm'].minigame) { let mg = Game.Objects['Farm'].minigame; Object.keys(mg.plants).forEach(p => { mg.plants[p].unlocked = 1; }); mg.getUnlockedN(); setInterval(() => { mg.plots.forEach(row => { row.forEach(tile => { if (tile[0] > 0) tile[1] = 1; }); }); }, 500); Game.UpdateMenu(); Game.Notify('FMS', 'Garden Complete'); } };
    $('b_achv').onclick = () => { Game.SetAllAchievs(1); Game.Notify('FMS', 'Achievements Unlocked'); };
    $('b_free').onclick = () => { Game.ObjectsById.forEach(o => o.free = 1); Game.UpdateMenu(); Game.Notify('FMS', 'Objects FREE'); };
    $('b_dragon').onclick = () => { Game.dragonLevel = 25; Game.UpdateMenu(); Game.Notify('FMS', 'Dragon Level MAX'); };
    $('b_wipe').onclick = () => { if (confirm("Are you sure you want to completely WIPE your save file and restart?")) { Game.HardReset(2); Game.Notify('FMS SYSTEM', 'SAVE WIPED'); } };
    
    $('b_ruin').onclick = () => { Game.RuinTheFun(); Object.keys(Game.buffs).forEach(key => { let b = Game.buffs[key]; if (b) { b.multCpS = 1000000000000; b.multClick = 1000000000000; b.maxTime = 1000000000; b.time = 1000000000; } }); Game.UpdateMenu(); };
    $('sld_fps').oninput = (e) => { let v = e.target.value; $('lbl_p').innerText = v; Game.fps = Number(v); };
    $('t-trig').onclick = () => { const c = $('m-cont'); c.style.display = (c.style.display === 'none') ? 'block' : 'none'; };

    Game.Notify('FM-SARGE', 'TACTICAL HUD DATA LINK LOCK (ver3.1.0)');
})();
