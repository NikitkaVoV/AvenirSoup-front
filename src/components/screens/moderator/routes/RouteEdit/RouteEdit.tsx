'use client'

import Image from 'next/image'
import styles from './styles.module.scss'
import classNames from "classnames";
import React from "react";
import {useActions} from "@/redux/hooks/useActions";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store/store";
import {useRouter} from "next/navigation";
import {SubmitHandler, useForm} from "react-hook-form";
import {Route} from "@/redux/store/routes/routes.slice";

export default function RouteEdit() {

    interface Inputs {
        name:string
        season:string
        description:string
    }

    const {setUserData, userLogIn} = useActions();
    const routes = useSelector((state: RootState) => state.routes)
    const id = routes.selectedRouteId;
    const routeData:Route = routes.rawDataBase.filter((item) => item.id === id)[0]
    const { routesUpdateDataRoute} = useActions()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log(data);
        routesUpdateDataRoute({id:id,...data})
    }

    React.useEffect(() => {
        let defaultValues = {
            name:routeData.name,
            season:routeData.season,
            description:routeData.description
        };
        reset({...defaultValues})
    },[id])


    return (
        <div className={classNames(styles.container,styles.containerEdit)}>
            <div className={styles.headerContainer}>
                <p className={styles.header}>Редактирование мероприятия</p>
            </div>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <h1 className={styles.title}>{routeData.name}</h1>
                <div className={styles.inputsContainer }>
                    <div className={styles.inputContainer}>
                        <p className={styles.inputLabel}>Название</p>
                        <input
                            className={classNames(styles.input, errors.name ? styles.errorInput : "")}
                            placeholder={errors.name ? "Это поле обязательно для заполнения" : "Введите название..." }
                            {...register('name', {required:true})}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <p className={styles.inputLabel}>Сезон</p>
                        <input
                            className={classNames(styles.input, errors.season ? styles.errorInput : "")}
                            placeholder={errors.season ? "Это поле обязательно для заполнения" : "Введите сезон..." }
                            {...register('season', {required:true})}
                        />
                    </div>
                    <div className={classNames(styles.inputContainer,styles.textArea)}>
                        <p className={styles.inputLabel}>Описание</p>
                        <textarea
                            className={classNames(styles.input, errors.description ? styles.errorInput : "")}
                            placeholder={errors.description? "Это поле обязательно для заполнения" : "Введите описание..." }
                            {...register('description', {required:true})}
                        />
                    </div>
                </div>
                <button className={styles.button}>
                    <p className={styles.buttonText}>Сохранить</p>
                </button>
            </form>
        </div>
    )
}
