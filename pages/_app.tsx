import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect, useState } from "react";
import Web3 from "web3";

declare let window: any;

function MyApp({ Component, pageProps }: AppProps) {
  const [authorized, setAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [insufficientFunds, setInsufficientFunds] = useState(false);

  const web3 = new Web3("https://cloudflare-eth.com");

  useEffect(() => {
    if (window.ethereum === undefined) {
      setHasError(true);
      setIsLoading(false);
      return;
    }

    if (
      window.ethereum.selectedAddress &&
      window.ethereum.selectedAddress.length > 0
    ) {
      checkHoldings(window.ethereum.selectedAddress);
    } else {
      setIsLoading(false);
    }
  }, []);

  async function getAccount() {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];
    return account;
  }

  const handleWallet = () => {
    getAccount().then((account: string) => {
      checkHoldings(account);
    });
  };

  const checkHoldings = async (account: string) => {
    try {
      const minABI = [
        {
          constant: true,
          inputs: [{ name: "_owner", type: "address" }],
          name: "balanceOf",
          outputs: [{ name: "balance", type: "uint256" }],
          type: "function",
        } as any,
      ];
      const tokenAddress = "0x35bd01fc9d6d5d81ca9e055db88dc49aa2c699a8";
      const contract = new web3.eth.Contract(minABI, tokenAddress);
      const result = await contract.methods.balanceOf(account).call();
      if (result >= 75000000000000000000) {
        setAuthorized(true);
      } else {
        setInsufficientFunds(true);
      }
    } catch (err) {}
    setIsLoading(false);
  };

  return authorized ? (
    <Component {...pageProps} />
  ) : isLoading ? (
    <div></div>
  ) : (
    <div>
      <Head>
        <title>FWB Base</title>
        <meta name="description" content="FWB Base" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="home">
        <div className="home-nav">
          <button
            className="button"
            onClick={hasError ? () => {} : handleWallet}
          >
            {hasError
              ? "Something's Wrong"
              : insufficientFunds
              ? "Buy More $FWB"
              : "Login To Read"}
            <span>
              {hasError
                ? "Try Chrome"
                : insufficientFunds
                ? "Then Try Again"
                : "75 $FWB"}
            </span>
          </button>
        </div>
      </div>

      <footer></footer>
    </div>
  );
}
export default MyApp;
