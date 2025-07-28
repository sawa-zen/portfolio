export const App = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 1, 0]} intensity={1} />

      <mesh position={[0, 0, -2]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    </>
  )
}
