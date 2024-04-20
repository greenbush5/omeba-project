type FloatingShapeProps = {
	shape: 'circle' | 'triangle' | 'square' | 'cross'
	top: number
	left: number
	animationDelay: number
};

export default function FloatingShape(props: FloatingShapeProps) {
	return (
		<span
			className={`floating ${props.shape}`}
			style={{
				top: `${props.top}%`,
				left: `${props.left}%`,
				animationDelay: `${props.animationDelay}s`
			}}
		/>
	);
}