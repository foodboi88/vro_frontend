import React, { useEffect } from 'react'
import './style.mission.scss'
import Mission1 from '../../images/mission/mission1.png'
import Mission2 from '../../images/mission/mission2.png'
import Mission3 from '../../images/mission/mission3.png'
import Mission4 from '../../images/mission/mission4.png'
import Banner1 from '../../images/mission/banner1.png'
import Banner2 from '../../images/mission/banner2.png'
import { Button, Form, Input } from 'antd'
import axios from 'axios'
const Mission = () => {

    const [form] = Form.useForm();
    const [lstCustomPage, setLstCustomPage] = React.useState<any[]>([])

    useEffect(() => {
        getCustomPage()
    }, [])

    const getCustomPage = async () => {
        await axios.get(`http://vroteam.online:6068/custom-pages`)
            .then(res => {
                console.log(res.data.data);

                const customPages = res.data.data.map((item: any) => {
                    // nếu item.title có thẻ <br/> loại bỏ thẻ và cho xuống dòng text và xóa đi dấu '.' nếu có ở cuối
                    return {
                        ...item,
                        title: item.title.replace(/<br\s*\/?>/gi, '\n'),
                        text: item.text.replace(/<br\s*\/?>/gi, '\n'),
                    }

                })
                console.log(customPages);
                setLstCustomPage(customPages)
            })
            .catch(err => {
                console.log(err)
            })
    }


    return (
        <>
            {(lstCustomPage && lstCustomPage.length > 0) &&
                <div className='main-mission'>
                    <div className="mission-item item-1">
                        <div className="mission-item-left">
                            <div className="title">
                                {lstCustomPage[0].title.split('\n').map((line: any, index: any) => (
                                    <div key={index}>{line}</div>
                                ))}
                            </div>
                            <div className="sub-title">
                                {lstCustomPage[0].text.split('\n').map((line: any, index: any) => (
                                    <div key={index}>{line}</div>
                                ))}
                            </div>
                        </div>
                        <div className="mission-item-right">
                            <img src={lstCustomPage[0].images} alt="" />
                        </div>
                    </div>

                    <div className="mission-banner"
                        style={{
                            backgroundImage: `url(${lstCustomPage[1].images})`
                        }}
                    >
                        <div className="title">
                            {lstCustomPage[1].title.split('\n').map((line: any, index: any) => (
                                <div key={index}>{line}</div>
                            ))}
                        </div>
                        <div className="sub-title">
                            {lstCustomPage[1].text.split('\n').map((line: any, index: any) => (
                                <div key={index}>{line}</div>
                            ))}
                        </div>
                    </div>

                    <div className="mission-item item-2">
                        <div className="mission-item-left">
                            <img src={lstCustomPage[2].images} alt="" />
                        </div>
                        <div className="mission-item-right">
                            <div className="title">
                                {lstCustomPage[2].title.split('\n').map((line: any, index: any) => (
                                    <div key={index}>{line}</div>
                                ))}
                            </div>
                            <div className="sub-title">
                                {lstCustomPage[2].text.split('\n').map((line: any, index: any) => (
                                    <div key={index}>{line}</div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mission-item item-3">
                        <div className="title">
                            {lstCustomPage[3].title.split('\n').map((line: any, index: any) => (
                                <div key={index}>{line}</div>
                            ))}
                        </div>
                        <div className='content'>
                            <div className='text'
                                style={{
                                    backgroundImage: `url(${Mission3})`
                                }}
                            >
                                {lstCustomPage[3].text.split('\n').map((line: any, index: any) => (
                                    <div key={index}>{line}</div>
                                ))}
                            </div>
                            <img src={lstCustomPage[3].images} alt="" />
                        </div>
                    </div>

                    <div className="mission-banner banner-2"
                        style={{
                            backgroundImage: `url(${lstCustomPage[4].images})`
                        }}
                    >
                        <div className="title">
                            {lstCustomPage[4].title.split('\n').map((line: any, index: any) => (
                                <div key={index}>{line}</div>
                            ))}
                        </div>
                        <div className="sub-title">
                            {lstCustomPage[4].text.split('\n').map((line: any, index: any) => (
                                <div key={index}>{line}</div>
                            ))}
                        </div>
                    </div>

                </div>
            }
        </>
    )
}

export default Mission
