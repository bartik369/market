import React, {FC} from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages, faFilm, faAddressCard, faNewspaper, faEnvelope, faCreditCard } from "@fortawesome/free-solid-svg-icons";
import style from './Admin.module.css'

const Menu:FC = () => {
    const navigate = useNavigate();
    return (
        <>
         <div className={style.item} onClick={() => navigate('/admin/edit-slider')}>
                        <div className={style.icon}>
                            <div className={style.img}>
                                <FontAwesomeIcon icon={faImages} />
                            </div>
                            <span>Слайдер</span>
                        </div>
                    </div>
                    <div className={style.item} onClick={() => navigate('/admin/add-movie')}>
                    <div className={style.icon}>
                            <div className={style.img}>
                            <FontAwesomeIcon icon={faFilm} />
                            </div>
                            <span>Добавить фильм</span>
                        </div>
                    </div>
                    <div className={style.item} onClick={() => navigate('/admin/add-actor')}>
                    <div className={style.icon}>
                            <div className={style.img}>
                            <FontAwesomeIcon icon={faAddressCard} />
                            </div>
                            <span>Добавить актера</span>
                        </div>
                    </div>
                    <div className={style.item} onClick={() => navigate('/admin/')}>
                    <div className={style.icon}>
                            <div className={style.img}>
                            <FontAwesomeIcon icon={faNewspaper} />
                            </div>
                            <span>Новости</span>
                        </div>
                    </div>
                    <div className={style.item} onClick={() => navigate('/admin/')}>
                    <div className={style.icon}>
                            <div className={style.img}>
                            <FontAwesomeIcon icon={faEnvelope} />
                            </div>
                            <span>Сообщения</span>
                        </div>
                    </div>
                    <div className={style.item} onClick={() => navigate('/admin/')}>
                    <div className={style.icon}>
                            <div className={style.img}>
                            <FontAwesomeIcon icon={faCreditCard} />
                            </div>
                            <span>Финансовая история</span>
                        </div>
                    </div>   
        </>
    );
};

export default Menu;