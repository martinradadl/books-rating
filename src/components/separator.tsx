import classNames from "classnames"

export const Separator = ({ className }: { className: string }) => {
    return (<div className={classNames('h-0.5 bg-gray-400', className)} />)
}