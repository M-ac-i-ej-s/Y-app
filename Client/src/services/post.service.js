import axios from "axios";
import authHeader from "./auth-header";
import { socket } from '../socket'

const API_URL = `https://${window.location.hostname}:3001/api/posts/`;

export const getUsersPosts = async (login, seenIds) => { 
    try {
        const response = await axios.get(API_URL + login,
            {
                params: {
                    seenIds: seenIds.join(','),
                },
                headers: {
                    ...authHeader(),
                    'Content-Type': 'application/json',
                },
            }
        );
    
        return response.data.Posts;
    } catch (error) {
        console.error('Error fetching user posts:', error);
        throw error; // You might want to handle errors appropriately in your component
    }
}

export const createPost = async (text, login) => {
    await axios.post(API_URL, 
            {
                    text: text,
                    login: login,
            },   
            {
                headers: {
                    ...authHeader(),
                    'Content-Type': 'application/json',
                },
            },
            ).then(async (response) => {
                socket.emit('newPost', response.data.Posts);
                return response.data.Posts;
            }).catch((error) => {
                console.log(error);
            });
}

export const deletePost = async (id) => {
    await axios.delete(API_URL + id, {
        headers: authHeader(),
    }).then(async (response) => {
        return response.data;
    }).catch((error) => {
        console.log(error);
    });
}

export const likePost = async (id, login) => {
    await axios.patch(API_URL + id + '/likePost', {login}, {
        headers: authHeader(),
    }).then(async (response) => {
        return response.data;
    }).catch((error) => {
        console.log(error);
    });
}

export const getAllLikedPosts = async (login, seenIds) => {
    try {
        const response = await axios.get(API_URL + login + '/likedPosts', {
            params: {
                seenIds: seenIds.join(','),
            },
            headers: {
                ...authHeader(),
                'Content-Type': 'application/json',
            },
        });
        return response.data.Posts;
    } catch (error) {
        console.error('Error fetching user posts:', error);
        throw error; // You might want to handle errors appropriately in your component
    }
};

export const savePost = async (id, login) => {
    await axios.patch(API_URL + id + '/savePost', {login}, {
        headers: authHeader(),
    }).then(async (response) => {
        return response.data;
    }).catch((error) => {
        console.log(error);
    });
};

export const getAllSavedPosts = async (login) => {
    try {
        const response = await axios.get(API_URL + login + '/savedPosts', {
            headers: authHeader(),
        });
        return response.data.Posts;
    } catch (error) {
        console.error('Error fetching user posts:', error);
        throw error; // You might want to handle errors appropriately in your component
    }
};

export const getPost = async (id) => {
    try {
        const response = await axios.get(API_URL + 'one/' + id, {
            headers: authHeader(),
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user posts:', error);
        throw error; // You might want to handle errors appropriately in your component
    }
};

export const postReply = async (id, text, login, user) => {
    await axios.post(API_URL + id + '/reply', {
        text: text,
        login: login,
        user: user
    }, {
        headers: authHeader(),
    }).then((response) => {
        return response.data;   
    }).catch((error) => {
        console.log(error);
    });
};

export const getPostReplies = async (id) => {
    try {
        const response = await axios.get(API_URL + id + '/replies', {
            headers: authHeader(),
        });
        return response.data.Posts;
    } catch (error) {
        console.error('Error fetching user posts:', error);
        throw error; // You might want to handle errors appropriately in your component
    }
};

export const updateReplies = async (id) => {
    await axios.patch(API_URL + id + '/replies',  {
        headers: authHeader(),
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        console.log(error);
    });
}

export const getAllReplies = async (login, seenIds) => {
    try {
        const response = await axios.get(API_URL + login + '/allReplies', {
            params: {
                seenIds: seenIds.join(','),
            },
            headers: {
                ...authHeader(),
                'Content-Type': 'application/json',
            },
        });
        return response.data.Posts;
    } catch (error) {
        console.error('Error fetching user posts:', error);
        throw error; // You might want to handle errors appropriately in your component
    }
};

export const getPostsExplore = async (login, type, text, seenIds) => {
    try {
        const response = await axios.get(API_URL + '/search', {
                params: {
                    q: text,
                    f: type,
                    seenIds: seenIds.join(','),
                    login: login,
                },
                headers: {
                    ...authHeader(),
                    'Content-Type': 'application/json',
                },
    });
        return response.data.Posts;
    } catch (error) {
        console.error('Error fetching user posts:', error);
        throw error; // You might want to handle errors appropriately in your component
    }
}

export const getPostsByFollowedUsers = async (login, seenIds) => {
    try {
        const response = await axios.get(API_URL + login + '/followedPosts', {
            params: {
                seenIds: seenIds.join(','),
            },
            headers: {
                ...authHeader(),
                'Content-Type': 'application/json',
            },
        });
        return response.data.Posts;
    } catch (error) {
        console.error('Error fetching user posts:', error);
        throw error; // You might want to handle errors appropriately in your component
    }
};

export const postRepost = async (id, login, text, user) => {
    try {
        const response = await axios.post(API_URL + id + '/repost', {
            login: login,
            text: text,
            user: user,
        }, {
            headers: {
                ...authHeader(),
                'Content-Type': 'application/json',
            },
        });
        return response.data.Post;
    } catch (error) {
        console.error('Error reposting post:', error);
        throw error; // You might want to handle errors appropriately in your component
    }
}