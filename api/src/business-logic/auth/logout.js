export default async (req, res) => {
    req.session.destroy();
    return res.json({ auth: false });
}