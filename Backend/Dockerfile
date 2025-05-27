FROM maven:3.9.6-eclipse-temurin-17 AS builder
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jdk
COPY --from=builder /app/target/Backend-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-Xmx256m", "-jar", "/app.jar"]