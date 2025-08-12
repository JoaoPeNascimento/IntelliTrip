const Title = (props: { children: React.ReactNode }) => {
  return (
    <h2 className="text-blue-600 font-bold text-lg mt-6 mb-1 uppercase">
      {props.children}
    </h2>
  );
};

export default Title;
