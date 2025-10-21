export default function InfoCard({hobbyOne, hobbyTwo, hobbyThree, imageSrc, link}) {
    return(
        <section>
            <h2>Hobbyer</h2>
            {imageSrc && (
                <a href={link} target="_blank" rel="noopener noreferrer">
                <img
                    src={imageSrc}
                    alt="Hobby"
                    style={{
                    width: "20%",
                    height: "auto",
                    borderRadius: "8px",
                    marginBottom: "1rem",
                    transition: "transform 0.3s ease"
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                    onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
                </a>
            )}
            <ul>
                <li>{hobbyOne}</li>
                <li>{hobbyTwo}</li>
                <li>{hobbyThree}</li>
            </ul>
        </section>
    )
}