type SectionTitleProps = {
    name?: string
    children?: React.ReactNode
}

export const SectionTitle = ({ name, children }: SectionTitleProps) => {
    return (
        <p className="text-2xl font-semibold">
            {children ?? name}
        </p>
    )
}