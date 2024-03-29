import Head from "next/head";
import { Container, Table } from "@mantine/core";
import { HeroText } from "@/components/Hero";
import { GetServerSideProps } from "next";
import ApiData from "@/components/Data";
import Chart from "@/components/Charts";
export interface Protocols{
  name:string;
  tvl:number;
  mcap:number;
  chain:string;
  chains:string[];
  category:string;
  chainTvls:{
    [key:string]:number
  };
}
export interface Pools{
  data:[
    {
      chain:string;
      project:string;
    }
  ]
}
export interface Aave{
  tvl:[
    {
      date:number;
      totalLiquidityUSD:number
    }
  ]
  hallmarks:[[number,string]]
}
export interface AaveMarketCap{
  market_caps:[[number,number]]
}
export interface Fee{
  protocols:[{
    id:string;
    name: string;
    category:string;
    chains:string[];
    dailyRevenue:number;
    totalRevenue:number;
    dailyFees:number;
    totalFees?:number
  }]
}
interface Props{
  protocols:Protocols[]
  pools:Pools
  aave:Aave
  aaveMarketCap:AaveMarketCap
  fee:Fee

}
const Home = ({protocols,pools,aave,aaveMarketCap,fee}:Props) => {

  return (
    <>
      <Head>
        <title>Remox Task</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container size="xl">
        <HeroText />
        <Table maw={800} mb={60} striped withBorder m="0 auto">
          <thead>
            <tr>
              <th>Name</th>
              <th style={{ textAlign: "right" }}>Value</th>
            </tr>
          </thead>
          <tbody>
            <ApiData protocols={protocols} pools={pools} fee={fee} />
          </tbody>
        </Table>
        <Chart aave={aave} marketCaps={aaveMarketCap}/>
      </Container>
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const [protocolsRes,poolsRes,aaveRes,aaveMarketCapRes,feeRes] = await Promise.all([
    fetch("https://api.llama.fi/protocols"),
    fetch("https://yields.llama.fi/pools"),
    fetch("https://api.llama.fi/protocol/aave-v2"),
    fetch("https://api.coingecko.com/api/v3/coins/aave/market_chart?vs_currency=usd&days=max"),
    fetch("https://api.llama.fi/overview/fees?excludeTotalDataChart=true&excludeTotalDataChartBreakdown=true&dataType=dailyFees")
  ]);
  const [protocols,pools,aave,aaveMarketCap,fee] = await Promise.all([
    protocolsRes.json(),
    poolsRes.json(),
    aaveRes.json(),
    aaveMarketCapRes.json(),
    feeRes.json()
  ]);

  return { props: { protocols,pools,aave,aaveMarketCap,fee } };
};
export default Home;
