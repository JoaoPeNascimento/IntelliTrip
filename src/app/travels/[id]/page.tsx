interface TravelDetailPage {
  params: {
    id: string;
  };
}

const TravelDetail = ({ params }: TravelDetailPage) => {
  return <h1>{params.id}</h1>;
};

export default TravelDetail;
