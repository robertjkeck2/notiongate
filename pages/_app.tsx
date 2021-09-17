import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useState } from "react";
import Web3 from "web3";

declare let window: any;

function MyApp({ Component, pageProps }: AppProps) {
  const [authorized, setAuthorized] = useState(false);
  const web3 = new Web3("https://cloudflare-eth.com");

  async function getAccount() {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];
    return account;
  }

  const handleWallet = () => {
    if (window.ethereum === undefined) {
      console.log("Unable to connect to wallet.");
      return;
    }
    getAccount().then(async function (account) {
      const minABI = [
        {
          constant: true,
          inputs: [{ name: "_owner", type: "address" }],
          name: "balanceOf",
          outputs: [{ name: "balance", type: "uint256" }],
          type: "function",
        } as any,
      ];
      const tokenAddress = "0xd3a3ca33c1aafeffa5c3be0d821210dba2c058d3";
      const contract = new web3.eth.Contract(minABI, tokenAddress);
      const result = await contract.methods.balanceOf(account).call();
      if (result > 900000000000000000000) {
        setAuthorized(true);
      }
    });
  };

  return authorized ? (
    <Component {...pageProps} />
  ) : (
    <div>
      <Head>
        <title>FWB Base</title>
        <meta name="description" content="FWB Base" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="home">
        <div className="home-nav">
          <button className="button" onClick={handleWallet}>
            Login To Read<span>75 $FWB</span>
          </button>
        </div>
      </div>

      <footer></footer>
    </div>
  );
}
export default MyApp;
