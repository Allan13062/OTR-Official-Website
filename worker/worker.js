// Cloudflare Worker: M-Pesa STK Push proxy. Secrets live in Worker env, never in the repo.
// Set with: wrangler secret put DARAJA_KEY / DARAJA_SECRET / DARAJA_PASSKEY ; vars: SHORTCODE, ALLOWED_ORIGIN, DARAJA_BASE, CALLBACK_URL
const cors=o=>({"Access-Control-Allow-Origin":o,"Access-Control-Allow-Methods":"POST,OPTIONS","Access-Control-Allow-Headers":"Content-Type","Content-Type":"application/json"});
export default{async fetch(req,env){
 const h=cors(env.ALLOWED_ORIGIN||"*");
 if(req.method==="OPTIONS")return new Response(null,{headers:h});
 const url=new URL(req.url);
 if(req.method!=="POST"||url.pathname!=="/stkpush")return new Response(JSON.stringify({ok:false,error:"Not found"}),{status:404,headers:h});
 const base=env.DARAJA_BASE||"https://sandbox.safaricom.co.ke";
 try{
  const {amount,phone}=await req.json();
  let p=String(phone||"").replace(/\D/g,"");
  if(p.startsWith("0"))p="254"+p.slice(1);else if(p.startsWith("7")||p.startsWith("1"))p="254"+p;
  const amt=Math.round(Number(amount));
  if(!/^254(7|1)\d{8}$/.test(p)||!(amt>=1&&amt<=150000))return new Response(JSON.stringify({ok:false,error:"Check phone number and amount"}),{status:400,headers:h});
  const tok=await (await fetch(base+"/oauth/v1/generate?grant_type=client_credentials",{headers:{Authorization:"Basic "+btoa(env.DARAJA_KEY+":"+env.DARAJA_SECRET)}})).json();
  const ts=new Date().toISOString().replace(/\D/g,"").slice(0,14);
  const body={BusinessShortCode:env.SHORTCODE,Password:btoa(env.SHORTCODE+env.DARAJA_PASSKEY+ts),Timestamp:ts,TransactionType:"CustomerPayBillOnline",Amount:amt,PartyA:p,PartyB:env.SHORTCODE,PhoneNumber:p,CallBackURL:env.CALLBACK_URL,AccountReference:"OTR",TransactionDesc:"OTR Giving"};
  const r=await (await fetch(base+"/mpesa/stkpush/v1/processrequest",{method:"POST",headers:{Authorization:"Bearer "+tok.access_token,"Content-Type":"application/json"},body:JSON.stringify(body)})).json();
  return new Response(JSON.stringify({ok:r.ResponseCode==="0",error:r.errorMessage||r.ResponseDescription}),{headers:h});
 }catch(e){return new Response(JSON.stringify({ok:false,error:"Server error"}),{status:500,headers:h})}
}}
