export const logout = async (req, res) =>{
    try {
        
        res.cookie("authToken","",{
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development", // HTTPS only in production
            sameSite: "Strict",
            expires: new Date(0) // Expire the cookie immediately
        });

        res.status(200).json({message: "Logout successful"});

    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}