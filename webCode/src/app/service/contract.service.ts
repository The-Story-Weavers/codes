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
  contract;
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
    // const contract = new ethers.Contract("0x06012c8cf97BEaD5deAe237070F9587f8E7A266d", ABI, this.provider.getSigner());
    // console.log(contract.methods);
    // 合约地址
    const contractAddress = '0x847397fd307123A92A1fDa48b46B082dcDd3bA30';

    // 初始化Provider
    const provider = new ethers.JsonRpcProvider('https://rpc.sepolia.linea.build');
    const signer = await this.provider.getSigner();
    // const blockNumber = await provider.getBlockNumber();
    // console.log("Block Number:", blockNumber);

    // const block = await provider.getBlock(blockNumber);
    // console.log("Block:", block);

    // 创建一个合约实例
    // this.contract = new ethers.Contract(contractAddress, ABI, provider);
    this.contract = new ethers.Contract(contractAddress, ABI, signer);
    console.log(signer.address);
    
    const userInfo = await this.contract.registeredUsers(signer.address);
    console.log(userInfo);
    return
    

    // todo loading = true
    try {
      const res = await this.contract.registerUser()
      console.log(res);
    } catch (error) {
      console.log("已经注册成功");
      

      // 合约生成hash const res2 = await this.contract.generateHash('50年后，河坊街西泠社，我的思绪被一个老头子打断了，我合上我爷爷的笔记')

      // 合约添加文章
      // const data = '50年后，河坊街西泠社，我的思绪被一个老头子打断了，我合上我爷爷的笔记';
      // const hash = ethers.keccak256(ethers.toUtf8Bytes(data));
      // const res3 = await this.contract.addArticle(hash)

    }
   
  
    // const data = '50年后，河坊街西泠社，我的思绪被一个老头子打断了，我合上我爷爷的笔记';
    // const hash = ethers.keccak256(ethers.toUtf8Bytes(data));

  }

  async getAllKitties() {
    const totalSupply = await this.contract.totalSupply();
  }
}
