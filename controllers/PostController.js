import PostModel from '../models/Post.js'

export const getAllPosts = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec();

        res.status(200).json(posts)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не вдалося отримати пости'
        })
    }
}

export const getPostById = async (req, res) => {
    try {
        const postId = req.params.id
        const doc = await PostModel.findOneAndUpdate(
            {_id: postId},
            {$inc: {viewsCount: 1}},
            {new: true}).populate('user')

        if (!doc) {
            return res.status(404).json({
                message: 'Пост не знайдено'
            });
        }
        res.status(200).json(doc)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не вдалося отримати пост'
        })
    }
}

export const createPost = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        })
        const post = await doc.save();
        res.status(200).json(post);

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не вдалося створити пост'
        })
    }
}

export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id
        const doc = await PostModel.findOneAndDelete({
            _id: postId
        })

        if(!doc){
            return res.status(404).json({
                message: 'Пост не знайдено'
            })
        }

        res.status(200).json({
            message: 'Пост успішно видалено',
            deletedPost: doc
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не вдалося видалити пост'
        })
    }
}
export const updatePost = async (req, res) => {
    try {
        const postId = req.params.id

        await PostModel.updateOne({
            _id: postId
        }, {
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        })

        res.status(200).json({
            success: true
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не вдалося обновити пост'
        })
    }
}