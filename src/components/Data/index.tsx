import { NextPage } from "next";
import { Protocols,Pools,Fee} from "@/pages";
interface Props{
  protocols:Protocols[];
  pools:Pools
  fee:Fee
}

const ApiData:NextPage<Props> = ({protocols,pools,fee}) =>  {
  const startDate = new Date("2020-12-03")
  const today = new Date();
  const diffInTime = today.getTime() - startDate.getTime();
  const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));
  const protocol=protocols.filter((item)=> item.name === "AAVE V2")
  const currentTvlUSD=Intl.NumberFormat('en',{notation:"compact",currency:"USD",style:"currency",maximumFractionDigits:2}).format(protocol[0].tvl) 
  const mcap=Intl.NumberFormat('en',{notation:"compact",currency:"USD",style:"currency",maximumFractionDigits:2}).format(protocol[0].mcap);
  const activePools = pools.data.filter((item)=> item.chain==="Ethereum" && item.project==="aave-v2").length
  const allTvlOnChain = protocols.filter((item)=> item.chains.find(i => i==="Ethereum") && item.category==="Lending").map((item)=> item.chainTvls.Ethereum).reduce((acc,amount)=> acc+amount)
  const protocolTvlOnChain=protocol[0].chainTvls.Ethereum
  const protocolFees = fee.protocols.filter((protocol)=> protocol.name==="AAVE V2")
  return (
    <>
      <tr>
        <td>CurrentTVL:</td>
        <td style={{ textAlign: "right" }}>{currentTvlUSD}</td>
      </tr>
      <tr>
        <td>Market Cap:</td>
        <td style={{ textAlign: "right" }}>{mcap}</td>
      </tr>
      <tr>
        <td>Current market share:</td>
        <td style={{ textAlign: "right" }}>{((protocolTvlOnChain/allTvlOnChain)*100).toFixed(2)+"%"}</td>
      </tr>
      <tr>
        <td>Market Cap/TVL:</td>
        <td style={{ textAlign: "right" }}>{(protocol[0].mcap/protocol[0].tvl).toFixed(2)}</td>
      </tr>
      <tr>
        <td>Number of days since the protocol launched:</td>
        <td style={{ textAlign: "right" }}>{diffInDays+" " +"days"}</td>
      </tr>
      <tr>
        <td>Number of active pools:</td>
        <td style={{ textAlign: "right" }}>{activePools}</td>
      </tr>
      <tr>
        <td>Daily Fees:</td>
        <td style={{ textAlign: "right" }}>{protocolFees[0].dailyFees}</td>
      </tr>
      <tr>
        <td>Daily Revenue:</td>
        <td style={{ textAlign: "right" }}>{protocolFees[0].dailyRevenue}</td>
      </tr>
      
    </>
  );
};

export default ApiData;



 