import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { JsonRpcProvider, Listener, ethers, getDefaultProvider } from "ethers";
import { Subject, from, fromEvent } from "rxjs";
import { ABI } from "./commonConfig";
import { ToolsService } from "./tools.service";

@Injectable({
  providedIn: "root",
})
export class ContractService {
  provider;
  contract;
  // linea
  contractAddress = "0xADd01DE438Fce0FC7939f791c9afFcC2f2a31848";
  // scroll
  // contractAddress = "0x5B528d17a8236F78B8c8ae0F16D4B4d94a424b5e";
  loading$ = new Subject<boolean>();
  constructor(private toolsService: ToolsService) {}

  connectWallet() {
    return new Promise((resolve, reject) => {
      if (window.ethereum) {
        this.provider = new ethers.BrowserProvider(window.ethereum); // 连接metamask
        // 有的话执行连接操作
        resolve(this.provider.getSigner()); // 获取signer signer里面含有地址
      } else {
        this.toolsService.tip("error", "Wallet not recognized");
        reject(null);
      }
    });
  }

  async sign() {
    const signer = await this.provider.getSigner();
    const userAddress = await signer.getAddress();
    // 请求用户签名
    const message = "Hello, Ethereum!";
    const signature = await signer.signMessage(message);
    // 验证签名
    const recoveredAddress = ethers.verifyMessage(message, signature);
    if (recoveredAddress === userAddress) {
      console.log("Signature is valid!");
    } else {
      console.log("Invalid signature!");
    }
  }
  async connectNetwork() {
    // 创建一个合约实例
    // const provider = new ethers.JsonRpcProvider('https://rpc.sepolia.linea.build');
    // this.contract = new ethers.Contract(contractAddress, ABI, provider);
    if (!this.contract) {
      const signer = await this.provider.getSigner();
      console.log("创建合约实例");
      
      this.contract = new ethers.Contract(this.contractAddress, ABI, signer);
    }
  }
  async registerAndLogin() {
    await this.connectNetwork();
    const signer = await this.provider.getSigner();
    const res = await this.contract.isUserRegistered(signer.address);
    console.log("======",res);
    // const res = "saf"
    
    if(res) { //已注册
      //查询用户青蛙数量
      // const res1 = await this.contract.registeredUsers(signer.address);
      // console.log(res1);
    } else { //未注册
      try {
        const res = await this.contract.registerUser();
        return res;
      } catch (error) {
        // console.info("用户拒绝注册");
        // {
        //   "code": 4001,
        //   "message": "ethers-user-denied: MetaMask Tx Signature: User denied transaction signature."
        // }
  
        if (error.info.error?.code == 4001) {
          console.info("User refused to register");
        }
        return {
          disconnect: true,
        };
      }

    }
    return {}
    
  }

  async addPage(id:number,text: string) {
    await this.connectNetwork();
    const hash = ethers.keccak256(ethers.toUtf8Bytes(text));
    try {
      const receipt = await this.contract.addArticle(id,hash);
      return receipt;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getPage(pid: number) {
    await this.connectNetwork();
    const [owner, id, uploadTime, frogNum, rewordTimes, rewordNum] =
      await this.contract.getTextInfo(pid);
    return {
      owner,
      id: Number(id),
      uploadTime: Number(uploadTime),
      frogNum: Number(frogNum),
      rewordTimes: Number(rewordTimes),
      rewordNum: Number(rewordNum),
    };
  }
  async rewardArticle(id: number) {
    await this.connectNetwork();
    const tx = {
      to: "0x2F90a4A14F42123E15909B696fE407f737ca689c",
      value: ethers.parseEther("0.00001"),
    };
    const signer = await this.provider.getSigner();
    // 发送交易
    const receipt = await signer.sendTransaction(tx);
    await receipt.wait();
    return receipt;
  }
}
