package main

import (
	"context"
	// "encoding/json"
	"log"
	"net/http"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/gin-gonic/gin"
)

const (
	registerUserABI = `[{"type":"function","name":"registerUser","inputs":[],"outputs":[],"stateMutability":"nonpayable"}]`
	contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
)
type Register struct{
	SignedTx string `json:"signedTx"`
}

func connectToEthereum() (*ethclient.Client, error) {
	client, err := ethclient.Dial("http://127.0.0.1:8545")
	return client, err
}

func registerUser(c *gin.Context) {
	var req Register
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	client, err := connectToEthereum()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to connect to Ethereum"})
		return
	}

	// 将签名交易字符串转换为字节数组
	rawTxBytes := common.FromHex(req.SignedTx)
	// 解析交易
	tx := new(types.Transaction)
	if err := tx.UnmarshalBinary(rawTxBytes); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to unmarshal transaction"})
		return
	}

	// 发送交易到以太坊网络
	err = client.SendTransaction(context.Background(), tx)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to send transaction"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Transaction sent", "txHash": tx.Hash().Hex()})
}

func main() {
    log.Println("Starting server...") 
	r := gin.Default()

	r.POST("/register", registerUser)
	// r.POST("/login", loginUser)

	if err := r.Run(":8080"); err != nil {
		log.Fatal(err)
	}
}