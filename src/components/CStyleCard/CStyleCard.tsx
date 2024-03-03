
import { Card } from "antd";
import Meta from "antd/lib/card/Meta";

import { useNavigate } from "react-router-dom";
import "./styles.stylecard.scss";
import Utils from "../../common/utils";
import ImageNotFound from "../../images/Image_not_available.png";
import { useDispatchRoot, useSelectorRoot } from "../../redux/store";
import { dispatch } from "rxjs/internal/observable/pairs";
import { advancedSearchingRequest } from "../../redux/controller";
import { useEffect, useState } from "react";
import axios from "axios";
interface props {
    imageUrl?: string;
    name?: string;
    id?: string
    type?: string;
}

interface DATA_TRANFER {
    target: string;
    value: string;
}


const CStyleCard = (props: props) => {
    const { cloneToolList } = useSelectorRoot(
        (state) => state.sketch
    ); // Lst cac ban ve
    const navigate = useNavigate();
    const dispatch = useDispatchRoot();
    const [isErrorImage, setIsErrorImage] = useState(false);
    const handleClick = () => {
        console.log(props.id);
        if (!props.id) return;
        const bodyrequest = {
            style: props.id
        };
        dispatch(advancedSearchingRequest(bodyrequest));
        navigate('/searching')
    };

    // useEffect(() => {
    //     if (props.type === 'architect' && props.id && props.id !== 'last') {
    //         console.log('useEffect', props);

    //         getImage(props);
    //     }
    // }, [props]);

    // const getImage = async (props: any) => {
    //     console.log('getimageUrl', props.imageUrl);

    //     await axios.get(`https://api.banvebank.com.vn/users/avatar/${props.id}`)
    //         .then((response: any) => {
    //             console.log('getimage', response);
    //             setIsErrorImage(false);
    //         })
    //         .catch((error: any) => {
    //             console.log('getimageError', error);
    //             setIsErrorImage(true);
    //         });
    // }

    return (
        <>
            {props.type !== 'architect'
                ?
                <div
                    onClick={() => {
                        if (!props.id) return;
                        handleClick()
                    }}
                    className="style-card-main"
                >
                    <img style={{ objectFit: 'cover' }} src={props.imageUrl ? props.imageUrl : ImageNotFound} alt="" />
                    <div className="style-card-title">{props.name}</div>
                </div>
                :
                <div
                    onClick={() => {
                        if (!props.id) return;
                        handleClick()
                    }}
                    className="style-card-main"
                >
                    {}
                    <img src={props.imageUrl ? props.imageUrl : ImageNotFound} alt="" />
                    <div className="style-card-title">{props.name}</div>
                </div>

            }
        </>

    );
};

export default CStyleCard;
