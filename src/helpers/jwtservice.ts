// import { Admin } from "../admin/model/admin.model";
// import { Client } from "../client/model/client.model";
// import { Market } from "../market/model/market.model";
// export async function getTokens(user: Client | Admin | Market) {
//     const jwtpayload = {
//       id: user.id,
//       is_active: user.is_active,
//       roles: user.roles
//     };

//     const [accessToken, refreshToken] = await Promise.all([
//       this.jwtService.signAsync(jwtpayload, {
//         secret: process.env.ACCESS_TOKEN_KEY,
//         expiresIn: process.env.ACCESS_TOKEN_TIME,
//       }),
//       this.jwtService.signAsync(jwtpayload, {
//         secret: process.env.REFRESH_TOKEN_KEY,
//         expiresIn: process.env.REFRESH_TOKEN_TIME,
//       }),
//     ]);
//     return {
//       access_Token: accessToken,
//       refresh_Token: refreshToken,
//     };
//   }