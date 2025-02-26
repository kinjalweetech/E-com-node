import Banner from "../models/Banner.js";


export async function addBanner(req, res) {
    try {
        const { title, link, order } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

        if (!imageUrl) {
            return res.status(400).json({ success: false, message: "Image is required" });
        }

        const banner = await Banner.create({
            title,
            imageUrl,
            link,
            order,
            createdBy: req.user.id
        });

        res.status(201).json({
            success: true,
            banner
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


export async function getBanners(req, res) {
    try {
        const banners = await Banner.findAll({
            where: { isActive: true },
            order: [['order', 'ASC']]
        });

        res.status(200).json({
            success: true,
            banners
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export async function updateBanner(req, res) {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Check if user is admin or super admin
        if (req.user.role !== 'admin' && req.user.role !== 'superadmin') {
            return res.status(403).json({
                success: false,
                message: 'Only admin and super admin can update banners'
            });
        }

        const banner = await Banner.findByPk(id);
        if (!banner) {
            return res.status(404).json({
                success: false,
                message: 'Banner not found'
            });
        }

        await banner.update(updateData);

        res.status(200).json({
            success: true,
            banner
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export async function deleteBanner(req, res) {
    try {
        const { id } = req.params;

        // Check if user is admin or super admin
        if (req.user.role !== 'admin' && req.user.role !== 'superadmin') {
            return res.status(403).json({
                success: false,
                message: 'Only admin and super admin can delete banners'
            });
        }

        const banner = await Banner.findByPk(id);
        if (!banner) {
            return res.status(404).json({
                success: false,
                message: 'Banner not found'
            });
        }

        await banner.destroy();

        res.status(200).json({
            success: true,
            message: 'Banner deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
} 