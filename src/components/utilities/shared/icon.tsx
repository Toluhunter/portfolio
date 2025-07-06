'use client'
type IconProps = {
    style?: React.CSSProperties,
    color?: string
    classes?: string
    width?: number
    height?: number
    onClick?: () => void
    name: string
}

function Icon(props: IconProps) {
    const style = props.style ?? {};

    return (
        <svg className={props.classes} preserveAspectRatio="none" width={props.width} height={props.height} style={style ? style : undefined} fill={props.color} onClick={props.onClick}>
            <use href={`/icons/sprite.svg#${props.name}`} />
        </svg>
    )
}

export default Icon