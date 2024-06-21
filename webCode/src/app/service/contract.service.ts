import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { JsonRpcProvider, Listener, ethers, getDefaultProvider } from 'ethers';
import { from, fromEvent } from 'rxjs';
import { ABI } from './commonConfig';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  provider;
  constructor() {
    this.provider = new ethers.BrowserProvider(window.ethereum); // 连接metamask
  }

  connectWallet() {
    return new Promise((resolve, reject) => {
      if (window.ethereum) {
        // 有的话执行连接操作
        resolve(this.provider.getSigner()); // 获取signer signer里面含有地址
      } else {
        reject(null);
      }
    });
  }

  async sign() {
    const signer = await this.provider.getSigner();
    const userAddress = await signer.getAddress();
   // 请求用户签名
    const message = 'Hello, Ethereum!';
    const signature = await signer.signMessage(message);
    console.log(signature);
    
    // 验证签名
    const recoveredAddress = ethers.verifyMessage(message, signature);
    if (recoveredAddress === userAddress) {
      console.log('Signature is valid!');
    } else {
      console.log('Invalid signature!');
    }
  }

  async connectNetwork() {
    const contract = new ethers.Contract("0x06012c8cf97BEaD5deAe237070F9587f8E7A266d", ABI, this.provider.getSigner());
    console.log(contract.methods);
    
  }
}
