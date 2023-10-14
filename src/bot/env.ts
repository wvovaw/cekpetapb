import { load } from "dotenv";

const isDenoDeploy = Deno.env.get("DENO_DEPLOYMENT_ID") !== undefined;

const env = isDenoDeploy ? Deno.env.toObject() : await load({ export: true });

export default env;
