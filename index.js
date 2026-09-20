const express = require('express');
const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const app = express();
app.use(express.json());

app.get('/', (req,res)=> res.send('TANZANIA DATING Bot Online'));

app.post('/pair', async (req,res)=>{
  const { number } = req.body;
  const { state, saveCreds } = await useMultiFileAuthState('auth');
  const sock = makeWASocket({ auth: state, printQRInTerminal: false });
  sock.ev.on('creds.update', saveCreds);
  if(!number) return res.json({error: 'weka namba'});
  const cleanNum = number.replace(/[^0-9]/g,'');
  setTimeout(async ()=>{
    try{
      const code = await sock.requestPairingCode(cleanNum);
      res.json({code: code});
    }catch(e){ res.json({error: e.message}) }
  }, 3000);
});

app.listen(3000, ()=> console.log('Server live'));
