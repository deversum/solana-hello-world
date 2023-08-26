'use client';
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
 
  const web3 = require("@solana/web3.js");
  const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
 
  // WARNING! This secret key never should be exposed on your 
  //          server
  const payer = web3.Keypair.fromSecretKey(
     new Uint8Array(
      [14,62,133,73,101,240,153,63,156,39,240,240,197,127,17,24,14,147,253,
      176,179,135,46,18,78,201,187,240,145,111,243,227,108,8,148,149,155,
      161,66,4,99,30,114,176,93,220,172,83,77,114,241,14,246,251,52,169,
      59,22,14,240,93,140,49,62])
  )

  //console.log(payer.secretKey.toString());
  //console.log("Solana Wallet Pubkey Payer:",payer.publicKey.toString())

  const [buttonText, setButtonText] = useState('Airdrop')
  const [buttonText2, setButtonText2] = useState('Send Transaction')
  const [payerPk, setPayerPk] = useState();
  const [balance, setBalance] = useState();
  const [url, setUrl] = useState();
 
  const [txhash, setTxHash] = useState();


  async function getBalance() {

    let balance = await connection.getBalance(payer.publicKey);
    console.log(`${balance / web3.LAMPORTS_PER_SOL} SOL`);
    setBalance(`${balance / web3.LAMPORTS_PER_SOL} SOL`)

  }


  useEffect(() => {
    setPayerPk(payer.publicKey.toString())
    getBalance()

  }, [])
 

  async function handleClick() {
    setButtonText("Airdropping...")
    console.log("handleClick")

    try{
      console.log("asking for solana:",web3.LAMPORTS_PER_SOL / 100)
      let airdropSignature = await connection.requestAirdrop(
        payer.publicKey,
        web3.LAMPORTS_PER_SOL,
      );

      setTimeout(() => {
        setButtonText("Airdrop")
      } , 3000);

    }
    catch(e){
      
      console.log("stopping airdroping")
      setTimeout(() => {
        setButtonText("Airdro was Failed - Try Latter")
      } , 3000);
    }
   
  
    
  }

  const PROGRAM_ID = "C3RYbeATwaujS9qbmAE75etgvGeZYPTRJncpejkDcBUw";

  const PROGRAM_ID_pk = new web3.PublicKey(
    "C3RYbeATwaujS9qbmAE75etgvGeZYPTRJncpejkDcBUw");


  async function handleClick2(){
    setButtonText2("Sending Transaction")
    
    console.log("Start adding transaction")
    // create an empty transaction
    const transaction = new web3.Transaction();
  
    // add a hello world program instruction to the transaction
    transaction.add(
      new web3.TransactionInstruction({
        keys: [],
        programId: PROGRAM_ID_pk,
      }),
    );
  
    // send the transaction to the Solana cluster
    console.log("Sending transaction...");
    const txHash = await web3.sendAndConfirmTransaction(
      connection,
      transaction,
      [payer],
    );
    console.log("Transaction sent with hash:", txHash);
  
    setTxHash(txHash)
    setButtonText2("Success sending tx! - Try again")

   

    setUrl('https://solscan.io/tx/'+txHash+'?cluster=devnet');
    
  }
  


//https://solscan.io/tx/4QbS4AKmJjX7JedeyZTriQxaUPB9Xsq9z5AWyKNUfcNfo3eU86cBFEMnaC1Py4FraS7RL366exBM9Z89CQouMFjj?cluster=devnet
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

         <p>Pubkey Payer: </p>
         <p>{payerPk}</p>
         <p>Current Balance: {balance}</p>
         <button 
         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
         onClick={handleClick}>{buttonText}</button>

        <p>Send Transaction to the Hello World Solana Program ID: </p>
        <p>{PROGRAM_ID}</p>
        <button 
         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
         onClick={handleClick2}>{buttonText2}</button>
       


       {!txhash && (           
               <p>Send the transaction to the program clickin on the button</p>             
        )

        }

        {txhash && (
          <div className='centre'>
            <p>Click on the link bellow to see your transaction on the solana explorer (make sure you have selected devnet)</p>
            
            <a href={url}>go to sol solcan.io  https://explorer.solana.com/tx/{txhash}</a>

 
           </div>
          )
        }
              

    </main>
  )
}
