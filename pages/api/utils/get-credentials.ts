export default async function handler(req: any, res: any) {
  try {
    const credentials = {
      application_id: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
      search_key: process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY,
    };
    res.status(200).json(credentials);
  } catch (err) {
    res.status(400).json({
      application_id: "",
      search_key: "",
    });
  }
}
