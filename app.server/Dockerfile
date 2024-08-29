# Base image for running the application
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

# Build image
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - \
    && apt-get install -y nodejs

ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["app.client/nuget.config", "app.client/"]
COPY ["app.server/app.server.csproj", "app.server/"]
COPY ["app.client/app.client.esproj", "app.client/"]
RUN dotnet restore "./app.server/app.server.csproj"
COPY . .
WORKDIR "/src/app.server"
RUN dotnet build "./app.server.csproj" -c $BUILD_CONFIGURATION -o /app/build

# Publish image
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./app.server.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Final image
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "app.server.dll"]
