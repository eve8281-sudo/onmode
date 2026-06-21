// 產生 QR Code 圖檔。改網址只要改下面 URL，然後執行： node generate-qr.js
const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

const URL = process.argv[2] || 'https://eve8281-sudo.github.io/onmode/';
const outDir = __dirname;

const common = {
  errorCorrectionLevel: 'M', // 容錯，掃描穩定
  margin: 4,                 // 安靜區（白邊），太窄手機會掃不到
  color: { dark: '#15131a', light: '#ffffff' },
};

async function main() {
  // 1) 高解析 PNG（適合列印、貼海報）
  await QRCode.toFile(path.join(outDir, 'qr.png'), URL, { ...common, type: 'png', width: 1080 });
  // 2) 向量 SVG（無限放大不糊）
  const svg = await QRCode.toString(URL, { ...common, type: 'svg', width: 1080 });
  fs.writeFileSync(path.join(outDir, 'qr.svg'), svg);

  console.log('QR 內容網址：', URL);
  console.log('已輸出：');
  console.log('  - ' + path.join(outDir, 'qr.png'));
  console.log('  - ' + path.join(outDir, 'qr.svg'));
}

main().catch((e) => { console.error(e); process.exit(1); });
