package main

import (
    "crypto/ecdsa"
    "fmt"
    "math/big"
	"encoding/hex"
    "github.com/ethereum/go-ethereum/crypto"
    "github.com/ethereum/go-ethereum/common/hexutil"
)



func VerifySig(signatureHex string, message string) (bool, ecdsa.PublicKey) {
    // 将签名从十六进制解码为字节数组
    signatureBytes, err := hexutil.Decode(signatureHex)
    if err != nil {
        fmt.Println("Error decoding signature:", err)
        return false, nil
    }

    // 对消息进行哈希处理（以太坊使用的是 Keccak-256 哈希算法）
    hash := crypto.Keccak256Hash([]byte(message))

    // 提取签名中的 r, s, v 值
    r, s, v := parseSignature(signatureBytes)
	sig := append(r.Bytes(), s.Bytes()...)
    sig = append(sig, byte(v.Uint64()-27))

    // 恢复公钥
    publicKey, err := crypto.Ecrecover(hash.Bytes(), sig)
    if err != nil {
        fmt.Println("Error recovering public key:", err)
        return false, nil
    }

    // 将公钥解析为 ecdsa.PublicKey
    parsedPublicKey, err := crypto.UnmarshalPubkey(publicKey)
    if err != nil {
        fmt.Println("Error unmarshalling public key:", err)
        return false, nil
    }

    // 创建 ecdsa.PublicKey 结构
    var publicKeyStruct ecdsa.PublicKey
    publicKeyStruct.X = parsedPublicKey.X
    publicKeyStruct.Y = parsedPublicKey.Y
    publicKeyStruct.Curve = crypto.S256()

    // 验证签名
    isValid := ecdsa.Verify(&publicKeyStruct, hash.Bytes(), r, s)
    return isValid, publicKeyStruct
}

// 解析以太坊签名的 r, s, v 值
func parseSignature(signature []byte) (*big.Int, *big.Int, *big.Int) {
    r := new(big.Int).SetBytes(signature[:32])
    s := new(big.Int).SetBytes(signature[32:64])
    v := new(big.Int).SetBytes(signature[64:])
    return r, s, v
}


// func main() {
//     signatureHex := "0xcaddbf2bbeacdf275aad4539d563fbf14471013979a0a1908dea4ffaeed3cedd0b4317ac8601c9dd4fe46be479691cc70ddfe0d9e99b9c46bacb29d25db9c5561b"
//     message := "Hello, Ethereum!"
//     valid, pubKey := VerifySig(signatureHex, message)
//     fmt.Println("verify message:", valid, hex.EncodeToString(pubKey))
// }