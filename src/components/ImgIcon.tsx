interface IImgIconProps {
    src: string;
    alt?: string;
    className?: string;
}

function ImgIcon({ src,alt,className }: IImgIconProps) {
    return ( 
        <>
        <img src={src} alt={alt} className={`${className}`} loading="lazy"/>
        </>
     );
}

export default ImgIcon;