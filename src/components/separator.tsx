import classNames from "classnames"

export const Separator = ({ className }: { className: string }) => {
    return (<div className={classNames('h-0.25 bg-gray-300', className)} />)
}