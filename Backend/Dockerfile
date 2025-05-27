FROM eclipse-temurin:17-jdk

COPY target/Backend-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT ["java", "-Xmx256m", "-jar", "/app.jar"]