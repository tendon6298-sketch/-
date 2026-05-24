// ==========================================================================
// 設定エリア
// ==========================================================================

// 現高校2年生が受験する、2028年1月の共通テスト初日
const TARGET_DATE = new Date("2028-01-15T00:00:00");

// 画面にランダムで表示させたい「一言コメント」のリスト
const COMMENTS = [
    "高2の今の時期からの積み重ねが、1年後にものすごい差になるよ。",
    "焦らなくて大丈夫。まずは定期テストや基礎固めを大切に。",
    "先輩たちの受験を見ながら、自分のペースを作っていこう。",
    "模試の結果に一喜一憂せず、弱点を見つけられたことを喜ぼう！",
    "勉強の習慣は一生の財産。まずは1日30分からでも続けよう。",
    "息抜きも大切。遊ぶときは全力で遊び、やるときは集中する！",
    "体調管理も実力のうち。今日も夜更かしせずによく寝よう。"
];

// ==========================================================================
// メインの処理
// ==========================================================================

function initApp() {
    updateTodayDate();    // 今日の日付を表示
    calculateCountdown(); // カウントダウンを計算して表示
    showRandomComment();  // 一言コメントを表示
}

// 1. 今日の日付を表示する関数
function updateTodayDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    
    const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
    const dayName = weekdays[now.getDay()];

    // HTMLの「id="today-date"」に今日の日付を書き込む
    document.getElementById("today-date").textContent = `${year}年${month}月${date}日 (${dayName})`;
}

// 2. カウントダウンを計算する関数
function calculateCountdown() {
    const now = new Date();
    
    // ----------------------------------------------------------------------
    // メイン：トータルの残り日数を計算
    // ----------------------------------------------------------------------
    const diffTime = TARGET_DATE - now;
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const totalDaysEl = document.getElementById("total-days");

    // ----------------------------------------------------------------------
    // サブ：「◯年 ◯ヶ月 ◯日」の内訳を計算
    // ----------------------------------------------------------------------
    let years = TARGET_DATE.getFullYear() - now.getFullYear();
    let months = TARGET_DATE.getMonth() - now.getMonth();
    let days = TARGET_DATE.getDate() - now.getDate();

    // 日数がマイナスになったら、前の月の日数を借りて調整する
    if (days < 0) {
        months -= 1;
        const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += previousMonth.getDate();
    }

    // 月数がマイナスになったら、年を1つ削って調整する
    if (months < 0) {
        years -= 1;
        months += 12;
    }

    // 画面の要素を取得
    const yearsEl = document.getElementById("remaining-years");
    const monthsEl = document.getElementById("remaining-months");
    const daysEl = document.getElementById("remaining-days");
    const detailedBox = document.getElementById("detailed-box");

    // 計算結果の表示パターン
    if (totalDays > 0) {
        // 通常時：メインの日数を表示
        totalDaysEl.textContent = totalDays;
        
        // サブの内訳を表示
        yearsEl.textContent = years;
        monthsEl.textContent = months;
        daysEl.textContent = days;
        
        // もし「0年」なら、スッキリさせるために年の文字ごと非表示にする演出
        if (years === 0) {
            // 年の数字と「年」のテキスト部分を隠す簡易処理
            yearsEl.style.display = "none";
            // テキストノード（「年」の文字）を直接消す代わりに、内訳を再構築
            detailedBox.innerHTML = `<span class="detailed-label">（分割：</span><span>${months}</span>ヶ月<span>${days}</span>日<span class="detailed-label">）</span>`;
        }
        
    } else if (totalDays === 0) {
        // 当日
        document.querySelector(".title").textContent = "共通テスト";
        totalDaysEl.textContent = "当日";
        document.querySelector(".days-unit").style.display = "none";
        detailedBox.style.display = "none"; // 内訳は非表示に
    } else {
        // 終了後
        document.querySelector(".title").textContent = "共通テストは";
        totalDaysEl.textContent = "終了";
        document.querySelector(".days-unit").style.display = "none";
        detailedBox.style.display = "none"; // 内訳は非表示に
    }
}

// 3. 一言コメントをランダムに選んで表示する関数
function showRandomComment() {
    const randomIndex = Math.floor(Math.random() * COMMENTS.length);
    document.getElementById("daily-comment").textContent = COMMENTS[randomIndex];
}

// アプリケーションの起動
initApp();